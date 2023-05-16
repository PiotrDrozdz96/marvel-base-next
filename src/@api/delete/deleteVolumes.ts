import fs from 'fs';

import Identifier from 'types/Identifier';
import JsonData from 'types/JsonData';
import { ApiVolume } from 'types/Volume';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteVolumes = (databaseName: string, id: Identifier) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/volumes.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const { volumes: database, meta } = JSON.parse(data) as JsonData<'volumes', ApiVolume>;
      const result = database[Number(id)];
      if (!result) {
        throw new Error(interpolate(messages.notFound, { id, baseName: 'volumes' }));
      }

      delete database[Number(id)];

      const newDatabase = {
        volumes: database,
        meta,
      };

      fs.writeFile(`src/database/db/${databaseName}/volumes.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve({ ...result, id });
      });
    });
  });

export default deleteVolumes;
