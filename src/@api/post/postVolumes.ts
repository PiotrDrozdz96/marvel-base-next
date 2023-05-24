'use server';

import fs from 'fs';

import { ApiVolume } from 'types/Volume';
import JsonData from 'types/JsonData';
import { ApiSerie } from 'types/Serie';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import stringifyDataBase from 'utils/stringifyDatabase';

const postVolumes = async (databaseName: string, body: Partial<ApiVolume>, reqId?: number) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (seriesErr, seriesData) => {
      if (seriesErr) {
        throw seriesErr;
      }

      const { series } = JSON.parse(seriesData) as JsonData<'series', ApiSerie>;
      if (body.serie_id && !series[body.serie_id]) {
        throw new Error(
          interpolate(messages.relations, {
            field: 'serie_id',
            value: body.serie_id,
            baseName: 'series',
          })
        );
      }

      fs.readFile(`src/database/db/${databaseName}/volumes.json`, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }

        const { volumes, meta } = JSON.parse(data) as JsonData<'volumes', ApiVolume>;
        if (reqId && !volumes[reqId as unknown as number]) {
          throw new Error(interpolate(messages.notFound, { id: reqId, baseName: `${databaseName}/volumes` }));
        }

        const id = reqId || meta.nextIndex;

        const newDatabase = {
          volumes: {
            ...volumes,
            [id]: {
              ...body,
              order: typeof body.order === 'number' ? body.order : meta.nextIndex - 1,
              global_order: typeof body.global_order === 'number' ? body.global_order : meta.nextIndex - 1,
            },
          },
          meta: reqId ? meta : { nextIndex: meta.nextIndex + 1 },
        };

        fs.writeFile(`src/database/db/${databaseName}/volumes.json`, stringifyDataBase(newDatabase), (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }
          resolve({ ...body, id });
        });
      });
    });
  });

export default postVolumes;
