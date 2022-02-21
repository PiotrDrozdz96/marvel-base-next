import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import { ApiMenuItem } from 'types/Menu';
import menuValidation from 'utils/apiValidators/menu';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: messages.post });
    return;
  }

  const { id } = req.query as Record<string, string>;

  const body: Partial<ApiMenuItem> = JSON.parse(req.body);
  const values = menuValidation(res, body);

  if (!values) {
    return;
  }

  const base = () => import(`database/menu.json`);
  base()
    .then(async ({ default: { menu, meta } }) => {
      if (values.parent_id && !menu[values.parent_id as unknown as keyof typeof menu]) {
        res.status(400).send({
          messages: interpolate(messages.relations, { field: 'parent_id', value: body.parent_id, baseName: 'menu' }),
        });
      } else {
        const newDatabase = {
          menu: {
            ...menu,
            [id]: values,
          },
          meta,
        };
        await fs.writeFile('src/database/menu.json', JSON.stringify(newDatabase, null, 2), (err) => {
          if (err) {
            res.status(505).send({ message: messages.internal });
            return;
          }
          res.status(200).json({ ...values, id });
        });
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

export default handler;
