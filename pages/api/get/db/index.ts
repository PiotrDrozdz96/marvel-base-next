import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fastFolderSize from 'fast-folder-size';
import Database from 'types/Database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  fs.readdir('src/database/db', (err, files) => {
    if (err) {
      res.status(404).json(err);
      return;
    }

    if (files.length === 0) {
      res.status(200).json([]);
    }

    const result: Partial<Database>[] = files.map((name) => ({ name }));
    for (let i = 0; i <= files.length - 1; i += 1) {
      fastFolderSize(`src/database/db/${files[i]}`, (sizeErr, bytes) => {
        if (sizeErr) {
          res.status(500).json(err);
          return;
        }
        result[i].size = bytes;
        if (result.every((item) => item.size !== undefined)) {
          res.status(200).json(result);
        }
      });
    }
  });
};

export default handler;
