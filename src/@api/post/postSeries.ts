'use server';

import fs from 'fs';

import { ApiSerie } from 'types/Serie';
import JsonData from 'types/JsonData';
import { ApiWave } from 'types/Wave';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const postSeries = async (databaseName: string, body: Partial<ApiSerie>, reqId?: number) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/waves.json`, 'utf8', (wavesErr, wavesData) => {
      if (wavesErr) {
        throw wavesErr;
      }

      const { waves } = JSON.parse(wavesData) as JsonData<'waves', ApiWave>;
      if (body.wave_id && !waves[body.wave_id]) {
        throw new Error(
          interpolate(messages.relations, {
            field: 'wave_id',
            value: body.wave_id,
            baseName: 'waves',
          })
        );
      }

      fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }

        const { series, meta } = JSON.parse(data) as JsonData<'series', ApiSerie>;
        if (reqId && !series[reqId as unknown as number]) {
          throw new Error(interpolate(messages.notFound, { id: reqId, baseName: `${databaseName}/series` }));
        }

        const id = reqId || meta.nextIndex;

        const newDatabase = {
          series: {
            ...series,
            [id]: {
              ...body,
              order: body.order || meta.nextIndex - 1,
            },
          },
          meta: reqId ? meta : { nextIndex: meta.nextIndex + 1 },
        };

        fs.writeFile(
          `src/database/db/${databaseName}/series.json`,
          JSON.stringify(newDatabase, null, 2),
          (writeErr) => {
            if (writeErr) {
              throw writeErr;
            }
            resolve({ ...body, id });
          }
        );
      });
    });
  });

export default postSeries;
