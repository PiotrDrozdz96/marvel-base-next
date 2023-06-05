import fs from 'fs';
import fastFolderSize from 'fast-folder-size';

import Database from 'types/Database';

const getDatabase = async (id: string): Promise<Database | void> =>
  new Promise((resolve) => {
    if (!fs.existsSync(`src/database/db/${id}`)) {
      resolve();
    }

    fastFolderSize(`src/database/db/${id}`, (err, size) => {
      if (err) {
        resolve();
      }
      resolve({ name: id, size: size || 0 });
    });
  });

export default getDatabase;
