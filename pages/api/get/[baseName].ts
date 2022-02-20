import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { baseName } = req.query;
  const base = () => import(`database/${baseName}.json`);
  base()
    .then((data) => {
      res.status(200).json(data.default);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

export default handler;
