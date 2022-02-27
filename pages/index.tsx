import { NextPage } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Home from '@pages/Home';
import getMenu from '@api/get/front/getMenu';

export const getServerSideProps: AppServerSideProps = async () => {
  const menu = await getMenu();

  return {
    props: {
      menu,
    },
  };
};

const HomePage: NextPage = () => <Home />;

export default HomePage;
