import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import getSerie from '@api/get/front/getSerie';
import getVolumes from '@api/get/front/getVolumes';
import SeriesShow from '@pages/Series/SeriesShow';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => getMetadata(`- Seria #${params.id}`);

const SeriesShowPage: NextPage = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getSerie(databaseName, Number(id));
  const volumes = await getVolumes(databaseName, (volume) => volume.serie_id === Number(id));

  if (!item) {
    notFound();
  }

  return <SeriesShow item={item} volumes={volumes} databaseName={databaseName} />;
};

export default SeriesShowPage;
