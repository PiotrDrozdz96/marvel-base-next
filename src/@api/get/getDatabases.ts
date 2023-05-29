import fs from 'fs';
import fastFolderSize from 'fast-folder-size';

import Database from 'types/Database';

const getDatabases = async (): Promise<Database[]> =>
  new Promise((resolve, reject) => {
    fs.readdir('src/database/db', (err, files) => {
      if (err) {
        reject();
      }

      if (files.length === 0) {
        resolve([]);
      }

      const result: Partial<Database>[] = files.map((name) => ({ name }));
      for (let i = 0; i <= files.length - 1; i += 1) {
        fastFolderSize(`src/database/db/${files[i]}`, (sizeErr, bytes) => {
          if (sizeErr) {
            result[i].size = NaN;
          } else {
            result[i].size = bytes;
          }
          if (result.every((item) => item.size !== undefined)) {
            resolve(result as Database[]);
          }
        });
      }
    });
  });

export default getDatabases;
