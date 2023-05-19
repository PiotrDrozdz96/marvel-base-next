import fs from 'fs';

import OrderField from 'types/OrderField';
import JsonData from 'types/JsonData';
import { ApiVolume } from 'types/Volume';
import mapObjectToArray from 'utils/mapObjectToArray';
import stringifyDataBase from 'utils/stringifyDatabase';

const reorderVolumesByDate = (databaseName: string, field: OrderField) =>
  new Promise((resolve) => {
    fs.readFile(`src/database/db/${databaseName}/volumes.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const parsedData = JSON.parse(data) as JsonData<'volumes', ApiVolume>;
      const items = parsedData.volumes;

      const ids = mapObjectToArray(items)
        .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
        .map((item) => item.id);

      ids.forEach((id, index) => {
        if (items[id]) {
          items[id][field] = index;
        }
      });

      const newDatabase = {
        volumes: items,
        meta: parsedData.meta,
      };

      fs.writeFile(`src/database/db/${databaseName}/volumes.json`, stringifyDataBase(newDatabase), (writeErr) => {
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

export default reorderVolumesByDate;
