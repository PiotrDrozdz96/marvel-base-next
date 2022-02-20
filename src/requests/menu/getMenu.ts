import { MenuItem } from 'types/Menu';
import mapObjectToArray from 'utils/mapObjectToArray';
import request from 'utils/request';
import sortBy from 'utils/sortBy';

const getMenu = async (): Promise<MenuItem[]> => {
  const menuData = await request('get', 'menu');
  const { menu } = menuData;
  const menuArray = mapObjectToArray(menu);
  const result = sortBy(
    menuArray.filter(({ type }) => type === 'MAIN_MENU'),
    'order'
  ).map((element) => ({
    ...element,
    items: sortBy(
      menuArray.filter(({ parent_id: parentId }) => parentId === element.id),
      'order'
    ),
  }));

  return result;
};

export default getMenu;
