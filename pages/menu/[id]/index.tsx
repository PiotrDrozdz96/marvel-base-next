import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { ApiMenuItem, MenuItem } from 'types/Menu';
import MenuForm from '@components/Menu/MenuForm';
import { mapRawMenu } from 'requests/menu/getMenu';
import request from 'utils/request';

type Props = {
  menu: MenuItem[];
  menuItem: ApiMenuItem | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  const currentId = id !== 'create' ? Number(id) : undefined;

  const menuData = await request('get', 'menu');
  const { menu: rawMenu } = menuData;

  return {
    props: {
      menu: mapRawMenu(rawMenu),
      menuItem: currentId ? rawMenu[currentId] : null,
    },
  };
};

const MenuPage = ({ menu, menuItem }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Marvel Base - Menu</title>
      <meta name="description" content="Marvel Base - Menu" />
    </Head>
    <MenuForm menu={menu} />
  </>
);

export default MenuPage;
