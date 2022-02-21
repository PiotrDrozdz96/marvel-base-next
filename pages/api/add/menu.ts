import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiMenuItem } from 'types/Menu';

import menuValidation from 'utils/apiValidators/menu';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: messages.post });
    return;
  }

  const body: Partial<ApiMenuItem> = JSON.parse(req.body);
  const values = menuValidation(res, body);

  if (!values) {
    return;
  }

  const base = () => import(`database/menu.json`);
  base()
    .then(({ default: { menu } }) => {
      if (values.parent_id && !menu[values.parent_id as unknown as keyof typeof menu]) {
        res.status(400).send({
          messages: interpolate(messages.relations, { field: 'parent_id', value: body.parent_id, baseName: 'menu' }),
        });
      } else {
        res.status(200).json(values);
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

export default handler;
