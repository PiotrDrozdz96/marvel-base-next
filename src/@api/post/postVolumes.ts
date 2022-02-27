import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import { ApiVolume } from 'types/Volume';
import JsonData from 'types/JsonData';
import { ApiSerie } from 'types/Serie';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import pick from 'utils/pick';

const seriesField: (keyof ApiVolume)[] = [
  'title',
  'subtitle',
  'image_url',
  'date',
  'serie_id',
  'order',
  'global_order',
];

const postVolumes = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve(res.status(405).send({ message: messages.post }));
      return;
    }

    const body: Partial<ApiVolume> = pick(JSON.parse(req.body), seriesField);
    const emptyField = seriesField.find((key) => !body[key] && body[key] !== 0);

    if (emptyField) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: emptyField }) }));
      return;
    }

    const { id: reqId, databaseName } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (seriesErr, seriesData) => {
      if (seriesErr) {
        resolve(res.status(404).json(seriesErr));
        return;
      }

      const { series } = JSON.parse(seriesData) as JsonData<'series', ApiSerie>;
      if (body.serie_id && !series[body.serie_id]) {
        resolve(
          res.status(400).send({
            messages: interpolate(messages.relations, {
              field: 'serie_id',
              value: body.serie_id,
              baseName: 'series',
            }),
          })
        );
        return;
      }

      fs.readFile(`src/database/db/${databaseName}/volumes.json`, 'utf8', (err, data) => {
        if (err) {
          resolve(res.status(404).json(err));
          return;
        }

        const { volumes, meta } = JSON.parse(data) as JsonData<'volumes', ApiVolume>;
        if (reqId && !volumes[reqId as unknown as number]) {
          resolve(
            res
              .status(404)
              .send({ message: interpolate(messages.notFound, { id: reqId, baseName: `${databaseName}/volumes` }) })
          );
          return;
        }

        const id = reqId || meta.nextIndex;

        const newDatabase = {
          volumes: {
            ...volumes,
            [id]: body,
          },
          meta: reqId ? meta : { nextIndex: meta.nextIndex + 1 },
        };

        fs.writeFile(
          `src/database/db/${databaseName}/volumes.json`,
          JSON.stringify(newDatabase, null, 2),
          (writeErr) => {
            if (writeErr) {
              resolve(res.status(500).json(writeErr));
              return;
            }
            resolve(res.status(200).json({ ...body, id }));
          }
        );
      });
    });
  });

export default postVolumes;
