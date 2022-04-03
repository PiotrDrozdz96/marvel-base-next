import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import { Volume } from 'types/Volume';
import { Alias } from 'types/Alias';
import getMenu from '@api/get/front/getMenu';
import getDatabase from '@api/get/getDatabase';
import get from '@api/get';
import DatabaseShow from '@pages/Database/DatabaseShow';
import mapApiToFront from 'utils/mapApiToFront';
import getVolumes from '@api/get/front/getVolumes';

type Props = {
  database: Database;
  waves: Wave[];
  volumes: Volume[];
  aliases: Alias[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const id = params?.databaseName as string;

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();
  const database = await getDatabase(id);
  const { waves } = await get(id, 'waves');
  const aliases = await get(id, 'aliases');
  const volumes = await getVolumes(id, (volume) => !volume.is_event, 'global_order');

  if (!database) {
    return { notFound: true };
  }

  return {
    props: {
      menu,
      title: `- Baza #${id}`,
      database,
      waves: mapApiToFront(waves),
      aliases: Object.keys(aliases).map((aliasKey) => ({ name: aliasKey, params: aliases[aliasKey].params })),
      volumes,
    },
  };
};

const DatabasePage = ({
  database,
  waves,
  volumes,
  aliases,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <DatabaseShow item={database} waves={waves} volumes={volumes} aliases={aliases} />
);

export default DatabasePage;
