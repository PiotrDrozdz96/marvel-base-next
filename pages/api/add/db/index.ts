import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import copydir from 'copy-dir';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve(res.status(405).send({ message: messages.post }));
      return;
    }

    const body: { name?: string } = JSON.parse(req.body);
    if (!body.name) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: 'name' }) }));
      return;
    }

    if (fs.existsSync(`src/database/db/${body.name}`)) {
      resolve(res.status(409).send({ message: interpolate(messages.conflict, { id: body.name, basename: 'db' }) }));
      return;
    }

    const name = body.name.toLowerCase().replace(/\s/g, '-');

    copydir(
      'src/consts/emptyDatabase',
      `src/database/db/${name}`,
      {
        utimes: false,
        mode: false,
        cover: true,
      },
      (err: unknown) => {
        if (err) {
          resolve(res.status(500).json(err));
          return;
        }
        resolve(res.status(200).json({ name }));
      }
    );
  });

export default handler;
