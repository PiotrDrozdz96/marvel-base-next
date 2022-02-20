import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import { MenuItem } from 'types/Menu';
import Home from '@pages/Home';
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

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>Marvel Base</title>
      <meta name="description" content="Marvel Base" />
    </Head>
    <Home />
  </>
);

export default HomePage;
