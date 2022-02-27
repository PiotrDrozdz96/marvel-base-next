import ApiHandler from 'types/ApiHandler';
import messages from 'utils/apiValidators/apiValidators.messages';

const defaultDeleteHandler: ApiHandler = (req, res) =>
  new Promise((resolve) => {
    resolve(res.status(405).send({ message: messages.post }));
  });

const apiBuilder =
  (postHandler: ApiHandler, deleteHandler: ApiHandler = defaultDeleteHandler): ApiHandler =>
  (req, res) => {
    if (req.method === 'DELETE') {
      return deleteHandler(req, res);
    }
    if (req.method === 'POST') {
      return postHandler(req, res);
    }
    return new Promise((resolve) => {
      resolve(res.status(405).send({ message: messages.postAndDelete }));
    });
  };

export default apiBuilder;
