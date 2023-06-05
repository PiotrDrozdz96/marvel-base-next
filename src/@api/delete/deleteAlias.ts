import fs from 'fs';

import { ApiAlias } from 'types/Alias';
import Identifier from 'types/Identifier';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteAlias = (databaseName: string, id: Identifier) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/aliases.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const aliases = JSON.parse(data) as Record<string, ApiAlias>;
      const result = aliases[id];
      if (!result) {
        throw new Error(interpolate(messages.notFound, { id, baseName: 'waves' }));
      }

      delete aliases[id];

      fs.writeFile(`src/database/db/${databaseName}/aliases.json`, JSON.stringify(aliases), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve({ ...result, name: id });
      });
    });
  });

export default deleteAlias;
