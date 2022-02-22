import type { NextApiRequest, NextApiResponse } from 'next';

import messages from 'utils/apiValidators/apiValidators.messages';

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve) => {
    if (req.method !== 'GET') {
      resolve(res.status(405).send({ message: messages.get }));
      return;
    }

    const base = () => import('database/menu.json');
    resolve(
      base()
        .then((data) => res.status(200).json(data.default))
        .catch((err) => res.status(404).json(err))
    );
  });

export default handler;
