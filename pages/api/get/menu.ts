import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import messages from 'utils/apiValidators/apiValidators.messages';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'GET') {
      resolve(res.status(405).send({ message: messages.get }));
      return;
    }

    fs.readFile('src/database/menu.json', 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }
      resolve(res.status(200).json(JSON.parse(data)));
    });
  });

export default handler;
