import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import getWave from '@api/get/front/getWave';
import getSeries from '@api/get/front/getSeries';
import WavesShow from '@pages/Waves/WavesShow';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => getMetadata(`- Seria #${params.id}`);

const WavesShowPage: NextPage = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getWave(databaseName, Number(id));

  if (!item) {
    notFound();
  }

  const series = await getSeries(databaseName, (serie) => serie.wave_id === Number(id));

  return <WavesShow item={item} series={series} databaseName={databaseName} />;
};

export default WavesShowPage;
