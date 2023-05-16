import fs from 'fs';

const deleteDatabase = (databaseName: string) =>
  new Promise((resolve) => {
    fs.rm(`src/database/db/${databaseName}`, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err;
      }
      resolve({ name: databaseName });
    });
  });

export default deleteDatabase;
