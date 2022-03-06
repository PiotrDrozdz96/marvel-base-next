import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { FrontNotebook } from 'types/Notebook';
import NotebooksShow from '@pages/Notebooks/NotebooksShow';
import getMenu from '@api/get/front/getMenu';
import getNotebook from '@api/get/front/getNotebook';

type Props = {
  item: FrontNotebook;
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getNotebook(databaseName, Number(id));

  if (!item) {
    return { notFound: true };
  }

  const menu = await getMenu();

  return {
    props: {
      title: `- Zeszyt - #${id}`,
      menu,
      item,
      databaseName,
    },
  };
};

const NotebooksShowPage = ({ item, databaseName }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <NotebooksShow item={item} databaseName={databaseName} />
);

export default NotebooksShowPage;
