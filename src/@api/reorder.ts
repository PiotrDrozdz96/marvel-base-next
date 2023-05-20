'use server';

import fs from 'fs';

import OrderField from 'types/OrderField';
import JsonData from 'types/JsonData';
import stringifyDataBase from 'utils/stringifyDatabase';

const reorderApi = (databaseName: string, itemsName: string, ids: number[], field: OrderField) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/${databaseName}.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
        return;
      }

      const parsedData = JSON.parse(data) as JsonData<string, { order: number; global_order: number }>;
      const items = parsedData[itemsName];

      ids.forEach((id, index) => {
        if (items[id]) {
          items[id][field] = index;
        }
      });

      const newDatabase = {
        [itemsName]: items,
        meta: parsedData.meta,
      };

      fs.writeFile(`src/database/${databaseName}.json`, stringifyDataBase(newDatabase), (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        resolve(
          ids.map((id) => ({
            ...items[id],
            id,
          }))
        );
      });
    });
  });

export default reorderApi;
