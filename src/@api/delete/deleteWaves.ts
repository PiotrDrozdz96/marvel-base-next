import fs from 'fs';

import Identifier from 'types/Identifier';
import JsonData from 'types/JsonData';
import { ApiWave } from 'types/Wave';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteWaves = (databaseName: string, id: Identifier) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/waves.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const { waves: database, meta } = JSON.parse(data) as JsonData<'waves', ApiWave>;
      const result = database[Number(id)];
      if (!result) {
        throw new Error(interpolate(messages.notFound, { id, baseName: 'waves' }));
      }

      delete database[Number(id)];

      const newDatabase = {
        waves: database,
        meta,
      };

      fs.writeFile(`src/database/db/${databaseName}/waves.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve({ ...result, id });
      });
    });
  });

export default deleteWaves;
