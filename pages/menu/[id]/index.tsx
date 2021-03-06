import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormVariant from 'types/FormVariant';
import { ApiMenuItem, MenuItem } from 'types/Menu';
import FormPartial from 'types/FormPartial';
import MenuForm from '@pages/Menu/MenuForm';
import { defaultValues, numberFields } from '@pages/Menu/MenuForm.consts';
import getMenu from '@api/get/getMenu';
import { mapRawMenu } from '@api/get/front/getMenu';
import convertValuesTo from 'utils/convertValuesTo';

type Props = {
  menu: MenuItem[];
  variant: FormVariant;
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
        ? {
            ...(rawMenu[id] as unknown as FormPartial<ApiMenuItem>),
            ...convertValuesTo(String, rawMenu[id], numberFields),
          }
        : { ...defaultValues, type: type || defaultValues.type, parent_id: parentId || defaultValues.parent_id },
    },
  };
};

const MenuFormPage = ({ menu, variant, initialValues, id }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <MenuForm menu={menu} initialValues={initialValues} variant={variant} itemId={id || undefined} />
);

export default MenuFormPage;
