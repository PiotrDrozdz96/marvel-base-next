import { InferGetServerSidePropsType } from 'next';

import getMenu from 'requests/menu/getMenu';
import Settings from '@pages/Settings/Settings';
import AppServerSideProps from 'types/AppServerSideProps';

export const getServerSideProps: AppServerSideProps = async () => {
  const menu = await getMenu();

  return {
    props: {
      menu,
      title: '- Settings',
    },
  };
};

const SettingsPage = ({ menu }: InferGetServerSidePropsType<typeof getServerSideProps>) => <Settings menu={menu} />;

export default SettingsPage;
