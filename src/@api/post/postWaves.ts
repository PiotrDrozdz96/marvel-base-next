'use server';

import fs from 'fs';

import { ApiWave } from 'types/Wave';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import JsonData from 'types/JsonData';

const postWaves = async (databaseName: string, body: Partial<ApiWave>, reqId?: number) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/waves.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const { waves, meta } = JSON.parse(data) as JsonData<'waves', ApiWave>;
      if (reqId && !waves[reqId as unknown as number]) {
        throw new Error(interpolate(messages.notFound, { id: reqId, baseName: `${databaseName}/waves` }));
      }

      const id = reqId || meta.nextIndex;

      const newDatabase = {
        waves: {
          ...waves,
          [id]: {
            ...body,
            order: body.order || meta.nextIndex - 1,
          },
        },
        meta: reqId ? meta : { nextIndex: meta.nextIndex + 1 },
      };

      fs.writeFile(`src/database/db/${databaseName}/waves.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve({ ...body, id });
      });
    });
  });

export default postWaves;
