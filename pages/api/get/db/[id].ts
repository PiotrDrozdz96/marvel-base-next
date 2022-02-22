import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fastFolderSize from 'fast-folder-size';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'GET') {
      resolve(res.status(405).send({ message: messages.get }));
      return;
    }

    const { id } = req.query as Record<string, string>;

    if (!fs.existsSync(`src/database/db/${id}`)) {
      resolve(res.status(404).send({ message: interpolate(messages.notFound, { id, baseName: 'db' }) }));
      return;
    }

    fastFolderSize(`src/database/db/${id}`, (err, size) => {
      if (err) {
        resolve(res.status(500).json(err));
        return;
      }
      resolve(res.status(200).json({ name: id, size }));
    });
  });
export default handler;
