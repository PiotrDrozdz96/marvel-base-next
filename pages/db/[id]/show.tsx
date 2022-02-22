import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import getMenu from 'requests/helpers/getMenu';
import getDatabase from 'requests/api/getDatabase';
import DatabaseShow from '@pages/Database/DatabaseShow';

type Props = {
  database: Database;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const id = params?.id as string;

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();
  const database = await getDatabase(id);

  if (!database) {
    return { notFound: true };
  }

  return {
    props: {
      menu,
      title: `- Baza #${id}`,
      database,
    },
  };
};

const DatabasePage = ({ database }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <DatabaseShow item={database} />
);

export default DatabasePage;
