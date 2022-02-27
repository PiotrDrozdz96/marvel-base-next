import fs from 'fs';

import ApiHandler from 'types/ApiHandler';

const deleteDatabase: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { databaseName } = req.query as Record<string, string>;

    fs.rm(
      `src/database/db/${databaseName}`,
      {
        recursive: true,
        force: true,
      },
      (err) => {
        if (err) {
          resolve(res.status(500).send(err));
          return;
        }
        resolve(res.status(200).json({ name: databaseName }));
      }
    );
  });

export default deleteDatabase;
