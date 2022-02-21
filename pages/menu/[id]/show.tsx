import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { MenuItem } from 'types/Menu';
import MenuShow from '@pages/Menu/MenuShow';
import { mapRawMenu } from 'requests/menu/getMenu';
import request from 'utils/request';

type Props = {
  menu: MenuItem[];
  item: MenuItem;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const id = params?.id as unknown as number;

  const menuData = await request('get', 'menu');
  const { menu: rawMenu } = menuData;
  const menu = mapRawMenu(rawMenu);

  const item = menu[id] || rawMenu[id] ? { ...rawMenu[id], id, items: [] } : undefined;

  if (!item) {
    return { notFound: true };
  }

  return {
    props: {
      title: `- Menu - #${id}`,
      menu: mapRawMenu(rawMenu),
      item,
    },
  };
};

const MenuPage = ({ menu, item }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <MenuShow menu={menu} item={item} />
);

export default MenuPage;
