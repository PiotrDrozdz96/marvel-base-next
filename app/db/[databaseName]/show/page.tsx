import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import getDatabase from '@api/get/getDatabase';
import get from '@api/get';
import DatabaseShow from '@pages/Database/DatabaseShow';
import mapApiToFront from 'utils/mapApiToFront';
import getVolumes from '@api/get/front/getVolumes';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => getMetadata(`- Baza - #${params.id}`);

const DatabasePage: NextPage = async ({ params }) => {
  const id = params?.databaseName as string;

  if (!id) {
    notFound();
  }

  const database = await getDatabase(id);

  if (!database) {
    notFound();
  }

  const { waves } = await get(id, 'waves');
  const aliases = await get(id, 'aliases');
  const volumes = await getVolumes(id, (volume) => !volume.is_event, 'global_order');

  return (
    <DatabaseShow
      item={database}
      waves={mapApiToFront(waves)}
      volumes={volumes}
      aliases={Object.keys(aliases).map((aliasKey) => ({ name: aliasKey, params: aliases[aliasKey].params }))}
    />
  );
};

export default DatabasePage;
