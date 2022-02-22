import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import getMenu from 'requests/menu/getMenu';
import Settings from '@pages/Settings/Settings';
import request from 'utils/request';

type Props = {
  databases: Database[];
};

export const getServerSideProps: AppServerSideProps<Props> = async () => {
  const menu = await getMenu();
  const databases = await request('get', 'db');

  return {
    props: {
      menu,
      title: '- Settings',
      databases,
    },
  };
};

const SettingsPage = ({ menu, databases }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Settings menu={menu} databases={databases} />
);

export default SettingsPage;
