import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import getMenu from 'requests/helpers/getMenu';
import getDatabases from 'requests/api/getDatabases';
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
