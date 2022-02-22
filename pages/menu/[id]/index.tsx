import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { ApiMenuItem, MenuItem } from 'types/Menu';
import FormPartial from 'types/FormPartial';
import MenuForm, { defaultValues } from '@pages/Menu/MenuForm';
import getMenu from 'requests/api/getMenu';
import { mapRawMenu } from 'requests/helpers/getMenu';

type Props = {
  menu: MenuItem[];
  variant: 'create' | 'edit';
  id: number | null;
  initialValues: FormPartial<ApiMenuItem>;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params, query }) => {
  const id = params?.id as number | 'create';
  const type = query?.type as string | undefined;
  const parentId = query?.parent_id as string | undefined;

  const { menu: rawMenu } = await getMenu();
  const isCreate = id === 'create';

  if (!isCreate && !rawMenu[id]) {
    return { notFound: true };
  }

  return {
    props: {
      title: `- Menu - ${isCreate ? 'Create' : `#${id}`}`,
      menu: mapRawMenu(rawMenu),
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      initialValues: !isCreate
        ? (rawMenu[id] as unknown as FormPartial<ApiMenuItem>)
        : { ...defaultValues, type: type || defaultValues.type, parent_id: parentId || defaultValues.parent_id },
    },
  };
};

const MenuFormPage = ({ menu, variant, initialValues, id }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <MenuForm menu={menu} initialValues={initialValues} variant={variant} itemId={id || undefined} />
);

export default MenuFormPage;
