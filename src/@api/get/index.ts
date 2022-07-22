import fs from 'fs';

import JsonData from 'types/JsonData';
import { ApiSerie } from 'types/Serie';
import { ApiVolume } from 'types/Volume';
import { ApiWave } from 'types/Wave';
import { ApiAlias } from 'types/Alias';

type DatabaseElementMap = {
  waves: JsonData<'waves', ApiWave>;
  series: JsonData<'series', ApiSerie>;
  volumes: JsonData<'volumes', ApiVolume>;
  aliases: Record<string, ApiAlias>;
};

const get = async <K extends keyof DatabaseElementMap>(
  databaseName: string,
  elementName: K
): Promise<DatabaseElementMap[K]> =>
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
