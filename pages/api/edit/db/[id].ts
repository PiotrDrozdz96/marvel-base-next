import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: messages.post });
    return;
  }

  const { id } = req.query as Record<string, string>;

  if (!fs.existsSync(`src/database/db/${id}`)) {
    res.status(404).send({ message: interpolate(messages.notFound, { id, baseName: 'db' }) });
    return;
  }

  const body: { name?: string } = JSON.parse(req.body);
  const { name } = body;

  if (!name) {
    res.status(400).send({ message: interpolate(messages.required, { field: 'name' }) });
    return;
  }

  if (fs.existsSync(`src/database/db/${name}`)) {
    res.status(409).send({ message: interpolate(messages.conflict, { id: name, basename: 'db' }) });
    return;
  }

  fs.rename(`src/database/db/${id}`, `src/database/db/${name}`, (err) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json({ name });
  });
};

export default handler;
