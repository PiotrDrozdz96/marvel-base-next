import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import messages from 'utils/apiValidators/apiValidators.messages';

const deleteDatabase: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    if (req.method !== 'DELETE') {
      resolve(res.status(405).send({ message: messages.delete }));
      return;
    }

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
