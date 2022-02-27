import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import JsonData from 'types/JsonData';
import { ApiWave } from 'types/Wave';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteWaves: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const id = Number(req.query.id);

    const { databaseName } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/waves.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { waves: database, meta } = JSON.parse(data) as JsonData<'waves', ApiWave>;
      const result = database[id];
      if (!result) {
        resolve(res.status(404).json({ message: interpolate(messages.notFound, { id, baseName: 'waves' }) }));
        return;
      }

      delete database[id];

      const newDatabase = {
        waves: database,
        meta,
      };

      fs.writeFile(`src/database/db/${databaseName}/waves.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (err) {
          resolve(res.status(500).send(writeErr));
          return;
        }
        resolve(res.status(200).json({ ...result, id }));
      });
    });
  });

export default deleteWaves;
