import { ApiMenuItem, MenuItem } from 'types/Menu';

import mapObjectToArray from 'utils/mapObjectToArray';
import sortBy from 'utils/sortBy';
import getApiMenu from '@api/get/getMenu';

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
    ).map((item) => ({ ...item, items: [] })),
  }));
};

const getMenu = async (): Promise<MenuItem[]> => {
  const { menu } = await getApiMenu();

  return mapRawMenu(menu);
};

export default getMenu;
