import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'DELETE') {
      resolve(res.status(405).send({ message: messages.delete }));
      return;
    }

    const { id } = req.query as Record<string, string>;

    const base = () => import(`database/menu.json`);
    base()
      .then(async (data) => {
        const database = data.default.menu;
        const { meta } = data.default;
        const result = database[id as keyof typeof database];
        if (!result) {
          resolve(res.status(404).json({ message: interpolate(messages.notFound, { id, baseName: 'menu' }) }));
          return;
        }
        delete database[id as keyof typeof database];
        const newDatabase = {
          menu: database,
          meta,
        };

        await fs.writeFile('src/database/menu.json', JSON.stringify(newDatabase, null, 2), (err) => {
          if (err) {
            resolve(res.status(500).send(err));
            return;
          }
          resolve(res.status(200).json({ ...result, id }));
        });
      })
      .catch((err) => {
        resolve(res.status(404).json(err));
      });
  });

export default handler;
