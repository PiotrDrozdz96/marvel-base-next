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
  id: number | null;
  initialValues: FormPartial<ApiMenuItem>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, query }) => {
  const id = params?.id as number | 'create';
  const type = query?.type as string | undefined;

  const menuData = await request('get', 'menu');
  const { menu: rawMenu } = menuData;
  const isCreate = id === 'create';

  return {
    props: {
      menu: mapRawMenu(rawMenu),
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      initialValues: !isCreate
        ? (rawMenu[id] as unknown as FormPartial<ApiMenuItem>)
        : { ...defaultValues, type: type || defaultValues.type },
    },
  };
};

const MenuPage = ({ menu, variant, initialValues, id }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Marvel Base - Menu</title>
      <meta name="description" content="Marvel Base - Menu" />
    </Head>
    <MenuForm menu={menu} initialValues={initialValues} variant={variant} itemId={id || undefined} />
  </>
);

export default MenuPage;
