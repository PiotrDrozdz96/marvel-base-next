import apiBuilder from 'utils/apiBuilder';
import postMenu from '@api/post/postMenu';
import deleteMenu from '@api/delete/deleteMenu';

export default apiBuilder(postMenu, deleteMenu);
