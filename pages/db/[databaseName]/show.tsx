import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import { Serie } from 'types/Serie';
import { Volume } from 'types/Volume';
import getMenu from '@api/get/front/getMenu';
import getDatabase from '@api/get/getDatabase';
import get from '@api/get';
import DatabaseShow from '@pages/Database/DatabaseShow';
import mapApiToFront from 'utils/mapApiToFront';
import getVolumes from '@api/get/front/getVolumes';

type Props = {
  database: Database;
  waves: Wave[];
  series: Serie[];
  volumes: Volume[];
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
  const volumes = await getVolumes(id, () => true, 'global_order');

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
      volumes,
    },
  };
};

const DatabasePage = ({ database, waves, series, volumes }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <DatabaseShow item={database} waves={waves} series={series} volumes={volumes} />
);

export default DatabasePage;
