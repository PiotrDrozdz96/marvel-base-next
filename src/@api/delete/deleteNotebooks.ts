import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import JsonData from 'types/JsonData';
import { ApiNotebook } from 'types/Notebook';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteNotebooks: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const id = Number(req.query.id);

    const { databaseName } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/notebooks.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { notebooks: database, meta } = JSON.parse(data) as JsonData<'notebooks', ApiNotebook>;
      const result = database[id];
      if (!result) {
        resolve(res.status(404).json({ message: interpolate(messages.notFound, { id, baseName: 'notebooks' }) }));
        return;
      }

      delete database[id];

      const newDatabase = {
        notebooks: database,
        meta,
      };

      fs.writeFile(
        `src/database/db/${databaseName}/notebooks.json`,
        JSON.stringify(newDatabase, null, 2),
        (writeErr) => {
          if (err) {
            resolve(res.status(500).send(writeErr));
            return;
          }
          resolve(res.status(200).json({ ...result, id }));
        }
      );
    });
  });

export default deleteNotebooks;
