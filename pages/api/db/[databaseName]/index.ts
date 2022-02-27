import apiBuilder from 'utils/apiBuilder';
import postDatabase from '@api/post/postDatabase';
import deleteDatabase from '@api/delete/deleteDatabase';

export default apiBuilder(postDatabase, deleteDatabase);
