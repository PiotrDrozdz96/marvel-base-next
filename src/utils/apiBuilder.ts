import ApiHandler from 'types/ApiHandler';
import notFound from 'utils/notFoundApiHandler';

const apiBuilder =
  (postHandler: ApiHandler, deleteHandler: ApiHandler = notFound, getHandler: ApiHandler = notFound): ApiHandler =>
  (req, res) => {
    switch (req.method) {
      case 'DELETE':
        return deleteHandler(req, res);
      case 'POST':
        return postHandler(req, res);
      case 'GET':
        return getHandler(req, res);
      default:
        return notFound(req, res);
    }
  };

export default apiBuilder;
