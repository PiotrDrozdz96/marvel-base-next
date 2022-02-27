import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import getMenu from '@api/get/front/getMenu';
import getDatabases from '@api/get/getDatabases';
import Settings from '@pages/Settings/Settings';

type Props = {
  databases: Database[];
};

export const getServerSideProps: AppServerSideProps<Props> = async () => {
  const menu = await getMenu();
  const databases = await getDatabases();

  return {
    props: {
      menu,
      title: '- Ustawienia',
      databases,
    },
  };
};

const SettingsPage = ({ menu, databases }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Settings menu={menu} databases={databases} />
);

export default SettingsPage;
