import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import { ApiSerie } from 'types/Serie';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import pick from 'utils/pick';
import JsonData from 'types/JsonData';

const seriesField: (keyof ApiSerie)[] = ['name', 'order', 'wave_id'];

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve(res.status(405).send({ message: messages.post }));
      return;
    }

    const body: Partial<ApiSerie> = pick(JSON.parse(req.body), seriesField);
    const emptyField = seriesField.find((key) => !body[key] && body[key] !== 0);

    if (emptyField) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: emptyField }) }));
      return;
    }

    const { id, databaseName } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { series, meta } = JSON.parse(data) as JsonData<'series', ApiSerie>;
      if (!series[id as unknown as number]) {
        resolve(
          res.status(404).send({ message: interpolate(messages.notFound, { id, baseName: `${databaseName}/series` }) })
        );
        return;
      }

      const newDatabase = {
        series: {
          ...series,
          [id]: body,
        },
        meta,
      };

      fs.writeFile(`src/database/db/${databaseName}/series.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          resolve(res.status(500).json(writeErr));
          return;
        }
        resolve(res.status(200).json({ ...body, id }));
      });
    });
  });

export default handler;
