import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.status(405).send({ message: messages.delete });
    return;
  }

  const { baseName, id } = req.query as Record<string, string>;

  const base = () => import(`database/${baseName}.json`);
  base()
    .then(async (data) => {
      const database = data.default[baseName];
      const { meta } = data.default;
      const result = database[id];
      if (!result) {
        res.status(404).json({ message: interpolate(messages.notFound, { id, baseName }) });
        return;
      }
      delete database[id];
      const newDatabase = {
        [baseName]: database,
        meta,
      };

      await fs.writeFile(`src/database/${baseName}.json`, JSON.stringify(newDatabase, null, 2), (err) => {
        if (err) {
          res.status(505).send({ message: messages.internal });
          return;
        }
        res.status(200).json({ ...result, id });
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

export default handler;
