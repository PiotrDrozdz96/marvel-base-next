import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fastFolderSize from 'fast-folder-size';

import Database from 'types/Database';
import messages from 'utils/apiValidators/apiValidators.messages';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'GET') {
      resolve(res.status(405).send({ message: messages.get }));
      return;
    }

    fs.readdir('src/database/db', (err, files) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      if (files.length === 0) {
        resolve(res.status(200).json([]));
        return;
      }

      const result: Partial<Database>[] = files.map((name) => ({ name }));
      for (let i = 0; i <= files.length - 1; i += 1) {
        fastFolderSize(`src/database/db/${files[i]}`, (sizeErr, bytes) => {
          if (sizeErr) {
            resolve(res.status(500).json(sizeErr));
            return;
          }
          result[i].size = bytes;
          if (result.every((item) => item.size !== undefined)) {
            resolve(res.status(200).json(result));
          }
        });
      }
    });
  });
export default handler;
