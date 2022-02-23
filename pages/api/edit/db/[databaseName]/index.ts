import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve(res.status(405).send({ message: messages.post }));
      return;
    }

    const { databaseName } = req.query as Record<string, string>;

    if (!fs.existsSync(`src/database/db/${databaseName}`)) {
      resolve(res.status(404).send({ message: interpolate(messages.notFound, { id: databaseName, baseName: 'db' }) }));
      return;
    }

    const body: { name?: string } = JSON.parse(req.body);

    if (!body.name) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: 'name' }) }));
      return;
    }

    const name = body.name.toLowerCase().replace(/\s/g, '-');

    if (fs.existsSync(`src/database/db/${name}`)) {
      resolve(res.status(409).send({ message: interpolate(messages.conflict, { id: name, basename: 'db' }) }));
      return;
    }

    fs.rename(`src/database/db/${databaseName}`, `src/database/db/${name}`, (err) => {
      if (err) {
        resolve(res.status(500).json(err));
        return;
      }
      resolve(res.status(200).json({ name }));
    });
  });

export default handler;
