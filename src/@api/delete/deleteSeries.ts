import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import JsonData from 'types/JsonData';
import { ApiSerie } from 'types/Serie';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteSeries: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const id = Number(req.query.id);

    const { databaseName } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { series: database, meta } = JSON.parse(data) as JsonData<'series', ApiSerie>;
      const result = database[id];
      if (!result) {
        resolve(res.status(404).json({ message: interpolate(messages.notFound, { id, baseName: 'series' }) }));
        return;
      }

      delete database[id];

      const newDatabase = {
        series: database,
        meta,
      };

      fs.writeFile(`src/database/db/${databaseName}/series.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (err) {
          resolve(res.status(500).send(writeErr));
          return;
        }
        resolve(res.status(200).json({ ...result, id }));
      });
    });
  });

export default deleteSeries;
