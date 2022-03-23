import ApiHandler from 'types/ApiHandler';

const notFound: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    resolve(res.status(404).end());
  });

export default notFound;
