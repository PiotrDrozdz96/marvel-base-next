import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import getMenu from '@api/get/getMenu';
import { mapRawMenu } from '@api/get/front/getMenu';
import MenuShow from '@pages/Menu/MenuShow';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => getMetadata(`- Menu - #${params.id}`);

const MenuPage: NextPage = async ({ params }) => {
  const id = params?.id as unknown as number;

  const { menu: rawMenu } = await getMenu();
  const menu = mapRawMenu(rawMenu);

  const item =
    menu.find(({ id: menuId }) => menuId === Number(id)) ||
    (rawMenu[id] ? { ...rawMenu[id], id, items: [] } : undefined);

  if (!item) {
    notFound();
  }

  const parentName = (!!item.parent_id && menu.find(({ id: menuId }) => menuId === item.parent_id)?.name) || undefined;

  return <MenuShow item={item} parentName={parentName} />;
};

export default MenuPage;
