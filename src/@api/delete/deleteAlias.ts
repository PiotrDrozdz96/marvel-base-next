import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import { ApiAlias } from 'types/Alias';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteAlias: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const id = req.query.id as string;

    const { databaseName } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/aliases.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const aliases = JSON.parse(data) as Record<string, ApiAlias>;
      const result = aliases[id];
      if (!result) {
        resolve(res.status(404).json({ message: interpolate(messages.notFound, { id, baseName: 'waves' }) }));
        return;
      }

      delete aliases[id];

      fs.writeFile(`src/database/db/${databaseName}/aliases.json`, JSON.stringify(aliases), (writeErr) => {
        if (err) {
          resolve(res.status(500).send(writeErr));
          return;
        }
        resolve(res.status(200).json({ ...result, name: id }));
      });
    });
  });

export default deleteAlias;
