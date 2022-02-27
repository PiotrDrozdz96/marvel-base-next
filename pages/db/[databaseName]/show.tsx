import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import { Serie } from 'types/Serie';
import getMenu from '@api/get/front/getMenu';
import getDatabase from '@api/get/getDatabase';
import get from '@api/get';
import DatabaseShow from '@pages/Database/DatabaseShow';
import mapApiToFront from 'utils/mapApiToFront';

type Props = {
  database: Database;
  waves: Wave[];
  series: Serie[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const id = params?.databaseName as string;

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();
  const database = await getDatabase(id);
  const { waves } = await get(id, 'waves');
  const { series } = await get(id, 'series');

  if (!database) {
    return { notFound: true };
  }

  return {
    props: {
      menu,
      title: `- Baza #${id}`,
      database,
      waves: mapApiToFront(waves),
      series: mapApiToFront(series),
    },
  };
};

const DatabasePage = ({ database, waves, series }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <DatabaseShow item={database} waves={waves} series={series} />
);

export default DatabasePage;
