import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { MenuItem } from 'types/Menu';
import getMenu from 'requests/menu/getMenu';
import Settings from '@pages/Settings/Settings';

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

const SettingsPage = ({ menu }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Marvel Base - Settings</title>
      <meta name="description" content="Marvel Base - Settings" />
    </Head>
    <Settings menu={menu} />
  </>
);

export default SettingsPage;
