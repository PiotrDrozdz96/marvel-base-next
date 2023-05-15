import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import FormPartial from 'types/FormPartial';
import { ApiMenuItem } from 'types/Menu';
import getMenu from '@api/get/getMenu';
import { mapRawMenu } from '@api/get/front/getMenu';
import MenuForm from '@pages/Menu/MenuForm';
import { defaultValues, numberFields } from '@pages/Menu/MenuForm.consts';
import getMetadata from 'utils/getMetadata';
import convertValuesTo from 'utils/convertValuesTo';

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const id = params?.id as number | 'create';
  const isCreate = id === 'create';
  return getMetadata(`- Menu - ${isCreate ? 'Create' : `#${id}`}`);
};

const MenuPage: NextPage = async ({ params, searchParams }) => {
  const id = params?.id as number | 'create';
  const type = searchParams?.type as string | undefined;
  const parentId = searchParams?.parent_id as string | undefined;

  const { menu: rawMenu } = await getMenu();
  const isCreate = id === 'create';

  if (!isCreate && !rawMenu[id]) {
    notFound();
    return null;
  }

  const initialValues = !isCreate
    ? {
        ...(rawMenu[id] as unknown as FormPartial<ApiMenuItem>),
        ...convertValuesTo(String, rawMenu[id], numberFields),
      }
    : { ...defaultValues, type: type || defaultValues.type, parent_id: parentId || defaultValues.parent_id };

  return (
    <MenuForm
      menu={mapRawMenu(rawMenu)}
      variant={isCreate ? 'create' : 'edit'}
      itemId={isCreate ? undefined : id}
      initialValues={initialValues}
    />
  );
};

export default MenuPage;
