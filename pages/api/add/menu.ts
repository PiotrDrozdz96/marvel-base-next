import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import JsonData from 'types/JsonData';
import { ApiMenuItem } from 'types/Menu';
import menuValidation from 'utils/apiValidators/menu';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'POST') {
      resolve(res.status(405).send({ message: messages.post }));
      return;
    }

    const body: Partial<ApiMenuItem> = JSON.parse(req.body);
    const values = menuValidation(res, body);

    if (!values) {
      resolve(res.end());
      return;
    }

    fs.readFile('src/database/menu.json', 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { menu, meta } = JSON.parse(data) as JsonData<'menu', ApiMenuItem>;
      if (values.parent_id && !menu[values.parent_id as unknown as keyof typeof menu]) {
        resolve(
          res.status(400).send({
            messages: interpolate(messages.relations, {
              field: 'parent_id',
              value: body.parent_id,
              baseName: 'menu',
            }),
          })
        );
      } else {
        const id = meta.nextIndex;
        const newDatabase = {
          menu: {
            ...menu,
            [id]: values,
          },
          meta: {
            nextIndex: meta.nextIndex + 1,
          },
        };
        fs.writeFile('src/database/menu.json', JSON.stringify(newDatabase, null, 2), (writeErr) => {
          if (writeErr) {
            resolve(res.status(500).json(writeErr));
            return;
          }
          resolve(res.status(200).json({ ...values, id }));
        });
      }
    });
  });

export default handler;
