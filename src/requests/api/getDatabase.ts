import fs from 'fs';
import fastFolderSize from 'fast-folder-size';

import Database from 'types/Database';

const getDatabase = async (id: string): Promise<Database> =>
  new Promise((resolve, reject) => {
    if (!fs.existsSync(`src/database/db/${id}`)) {
      reject();
      return;
    }

    fastFolderSize(`src/database/db/${id}`, (err, size) => {
      if (err) {
        reject();
        return;
      }
      resolve({ name: id, size: size || 0 });
    });
  });

export default getDatabase;
