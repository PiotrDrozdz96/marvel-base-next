'use server';

import { headers as getHeaders } from 'next/headers';
import { revalidatePath } from 'next/cache';
import fs from 'fs';

import JsonData from 'types/JsonData';
import { ApiVolume } from 'types/Volume';
import mapObjectToArray from 'utils/mapObjectToArray';
import stringifyDataBase from 'utils/stringifyDatabase';

const reorderVolumesByDate = async () => {
  const headers = getHeaders();
  const url = headers.get('Next-Url');
  const parts = url?.split('/') || [];
  const databaseName = parts[2];

  const success = await new Promise((resolve) => {
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
          items[id].global_order = index;
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
        resolve(true);
      });
    });
  });

  if (success) {
    revalidatePath('');
  }
};

export default reorderVolumesByDate;
