import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import { Alias, ApiAlias } from 'types/Alias';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import pick from 'utils/pick';

const aliasField: (keyof Alias)[] = ['name', 'params'];
const aliasRequiredField: (keyof Alias)[] = ['name', 'params'];

const postAlias: ApiHandler = async (req, res) => {
  const { databaseName } = req.query as Record<string, string>;

  return new Promise((resolve) => {
    const body: Alias = pick(JSON.parse(req.body), aliasField);
    const emptyField = aliasRequiredField.find((key) => !body[key]);

    if (emptyField) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: emptyField }) }));
      return;
    }

    fs.readFile(`src/database/db/${databaseName}/aliases.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const aliases = JSON.parse(data) as Record<string, ApiAlias>;

      const newDatabase = {
        ...aliases,
        [body.name]: { params: body.params },
      };

      fs.writeFile(`src/database/db/${databaseName}/aliases.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          resolve(res.status(500).json(writeErr));
          return;
        }
        resolve(res.status(200).json(body));
      });
    });
  });
};

export default postAlias;
