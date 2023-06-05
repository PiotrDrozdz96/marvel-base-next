import { cache } from 'react';
import fs from 'fs';

import JsonData from 'types/JsonData';
import { ApiMenuItem } from 'types/Menu';

const getMenu = cache(
  async (): Promise<JsonData<'menu', ApiMenuItem>> =>
    new Promise((resolve, reject) => {
      fs.readFile('src/database/menu.json', 'utf8', (err, data) => {
        if (err) {
          reject();
          return;
        }
        resolve(JSON.parse(data));
      });
    })
);

export default getMenu;
