import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import getMenu from 'requests/menu/getMenu';

import { MenuItem } from 'types/Menu';

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

// eslint-disable-next-line arrow-body-style
const SettingsPage = ({ menu }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>siema</div>;
};

export default SettingsPage;
