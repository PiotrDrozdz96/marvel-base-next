import fs from 'fs';

import JsonData from 'types/JsonData';
import { ApiWave } from 'types/Wave';

type DatabaseElementMap = {
  waves: JsonData<'waves', ApiWave>;
};

const get = async (
  databaseName: string,
  elementName: keyof DatabaseElementMap
): Promise<DatabaseElementMap[typeof elementName]> =>
  new Promise((resolve, reject) => {
    fs.readFile(`src/database/db/${databaseName}/${elementName}.json`, 'utf8', (err, data) => {
      if (err) {
        reject();
        return;
      }
      resolve(JSON.parse(data));
    });
  });

export default get;
