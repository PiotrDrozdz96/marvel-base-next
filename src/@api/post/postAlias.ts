import fs from 'fs';

import { Alias, ApiAlias } from 'types/Alias';

const postAlias = async (databaseName: string, body: Alias) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/aliases.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const aliases = JSON.parse(data) as Record<string, ApiAlias>;

      const newDatabase = {
        ...aliases,
        [body.name]: { params: body.params },
      };

      fs.writeFile(`src/database/db/${databaseName}/aliases.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve(body);
      });
    });
  });

export default postAlias;
