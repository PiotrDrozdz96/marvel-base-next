import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { MenuItem } from 'types/Menu';
import getMenu from 'requests/menu/getMenu';

type Props = {
  menu: MenuItem[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const menu = await getMenu();

  return {
    props: {
      menu,
    },
  };
};

const MenuPage = ({ menu }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Marvel Base - Menu</title>
      <meta name="description" content="Marvel Base - Menu" />
    </Head>
    <div>siema</div>
  </>
);

export default MenuPage;
