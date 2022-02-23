import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import getMenu from 'requests/helpers/getMenu';
import getDatabase from 'requests/api/getDatabase';
import get from 'requests/api/get';
import DatabaseShow from '@pages/Database/DatabaseShow';
import mapApiToFront from 'utils/mapApiToFront';

type Props = {
  database: Database;
  waves: Wave[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const id = params?.databaseName as string;

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();
  const database = await getDatabase(id);
  const { waves } = await get(id, 'waves');

  if (!database) {
    return { notFound: true };
  }

  return {
    props: {
      menu,
      title: `- Baza #${id}`,
      database,
      waves: mapApiToFront(waves),
    },
  };
};

const DatabasePage = ({ database, waves }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <DatabaseShow item={database} waves={waves} />
);

export default DatabasePage;
