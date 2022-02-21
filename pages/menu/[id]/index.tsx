import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { ApiMenuItem, MenuItem } from 'types/Menu';
import FormPartial from 'types/FormPartial';
import MenuForm, { defaultValues } from '@components/Menu/MenuForm';
import { mapRawMenu } from 'requests/menu/getMenu';
import request from 'utils/request';

type Props = {
  menu: MenuItem[];
  variant: 'create' | 'edit';
  initialValues: FormPartial<ApiMenuItem>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, query }) => {
  const id = params?.id as string;
  const type = query?.type as string | undefined;

  const menuData = await request('get', 'menu');
  const { menu: rawMenu } = menuData;

  return {
    props: {
      menu: mapRawMenu(rawMenu),
      variant: id !== 'create' ? 'edit' : 'create',
      initialValues: { ...defaultValues, type: type || defaultValues.type },
    },
  };
};

const MenuPage = ({ menu, initialValues }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Marvel Base - Menu</title>
      <meta name="description" content="Marvel Base - Menu" />
    </Head>
    <MenuForm menu={menu} initialValues={initialValues} />
  </>
);

export default MenuPage;
