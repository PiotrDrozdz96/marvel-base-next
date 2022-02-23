import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import { ApiWave } from 'types/Wave';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import pick from 'utils/pick';
import JsonData from 'types/JsonData';

const wavesField: (keyof ApiWave)[] = ['name', 'order'];

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve(res.status(405).send({ message: messages.post }));
      return;
    }

    const body: Partial<ApiWave> = pick(JSON.parse(req.body), wavesField);
    const emptyField = wavesField.find((key) => !body[key] && body[key] !== 0);

    if (emptyField) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: emptyField }) }));
      return;
    }

    const { databaseName } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/waves.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { waves, meta } = JSON.parse(data) as JsonData<'waves', ApiWave>;
      const id = meta.nextIndex;
      const newDatabase = {
        waves: {
          ...waves,
          [id]: body,
        },
        meta: {
          nextIndex: meta.nextIndex + 1,
        },
      };

      fs.writeFile(`src/database/db/${databaseName}/waves.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          resolve(res.status(500).json(writeErr));
          return;
        }
        resolve(res.status(200).json({ ...body, id }));
      });
    });
  });

export default handler;
