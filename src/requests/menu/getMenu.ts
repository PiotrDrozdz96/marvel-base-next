import { ApiMenuItem, MenuItem } from 'types/Menu';
import mapObjectToArray from 'utils/mapObjectToArray';
import request from 'utils/request';
import sortBy from 'utils/sortBy';

export const mapRawMenu = (menu: Record<number, ApiMenuItem>): MenuItem[] => {
  const menuArray = mapObjectToArray(menu);

  return sortBy(
    menuArray.filter(({ type }) => type === 'MAIN_MENU'),
    'order'
  ).map((element) => ({
    ...element,
    items: sortBy(
      menuArray.filter(({ parent_id: parentId }) => parentId === element.id),
      'order'
    ),
  }));
};

const getMenu = async (): Promise<MenuItem[]> => {
  const menuData = await request('get', 'menu');
  const { menu } = menuData;

  return mapRawMenu(menu);
};

export default getMenu;
