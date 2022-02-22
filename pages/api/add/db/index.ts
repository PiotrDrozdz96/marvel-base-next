import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import copydir from 'copy-dir';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: messages.post });
    return;
  }

  const body: { name?: string } = JSON.parse(req.body);
  if (!body.name) {
    res.status(400).send({ message: interpolate(messages.required, { field: 'name' }) });
    return;
  }

  if (fs.existsSync(`src/database/db/${body.name}`)) {
    res.status(409).send({ message: interpolate(messages.conflict, { id: body.name, basename: 'db' }) });
    return;
  }

  copydir(
    'src/consts/emptyDatabase',
    `src/database/db/${body.name}`,
    {
      utimes: false,
      mode: false,
      cover: true,
    },
    (err: unknown) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json({ name: body.name });
    }
  );
};

export default handler;
