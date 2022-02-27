import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import JsonData from 'types/JsonData';
import { ApiMenuItem } from 'types/Menu';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import keysOf from 'utils/keysOf';

const deleteMenu: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    if (req.method !== 'DELETE') {
      resolve(res.status(405).send({ message: messages.delete }));
      return;
    }

    const id = Number(req.query.id);

    fs.readFile('src/database/menu.json', 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { menu: database, meta } = JSON.parse(data) as JsonData<'menu', ApiMenuItem>;
      const result = database[id];
      if (!result) {
        resolve(res.status(404).json({ message: interpolate(messages.notFound, { id, baseName: 'menu' }) }));
        return;
      }

      [id, ...keysOf(database).filter((key) => database[key].parent_id === id)].forEach((key) => {
        delete database[key as keyof typeof database];
      });

      const newDatabase = {
        menu: database,
        meta,
      };

      fs.writeFile('src/database/menu.json', JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (err) {
          resolve(res.status(500).send(writeErr));
          return;
        }
        resolve(res.status(200).json({ ...result, id }));
      });
    });
  });

export default deleteMenu;
