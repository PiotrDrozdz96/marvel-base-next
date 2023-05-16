import fs from 'fs';

import Identifier from 'types/Identifier';
import JsonData from 'types/JsonData';
import { ApiMenuItem } from 'types/Menu';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import keysOf from 'utils/keysOf';

const deleteMenu = (_: string, id: Identifier) =>
  new Promise((resolve) => {
    fs.readFile('src/database/menu.json', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const { menu: database, meta } = JSON.parse(data) as JsonData<'menu', ApiMenuItem>;
      const result = database[Number(id)];
      if (!result) {
        throw new Error(interpolate(messages.notFound, { id, baseName: 'menu' }));
      }

      [id, ...keysOf(database).filter((key) => database[key].parent_id === id)].forEach((key) => {
        delete database[key as keyof typeof database];
      });

      const newDatabase = {
        menu: database,
        meta,
      };

      fs.writeFile('src/database/menu.json', JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve({ ...result, id });
      });
    });
  });

export default deleteMenu;
