import fs from 'fs';

import Identifier from 'types/Identifier';
import JsonData from 'types/JsonData';
import { ApiSerie } from 'types/Serie';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const deleteSeries = (databaseName: string, id: Identifier) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const { series: database, meta } = JSON.parse(data) as JsonData<'series', ApiSerie>;
      const result = database[Number(id)];
      if (!result) {
        throw new Error(interpolate(messages.notFound, { id, baseName: 'series' }));
      }

      delete database[Number(id)];

      const newDatabase = {
        series: database,
        meta,
      };

      fs.writeFile(`src/database/db/${databaseName}/series.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve({ ...result, id });
      });
    });
  });

export default deleteSeries;
