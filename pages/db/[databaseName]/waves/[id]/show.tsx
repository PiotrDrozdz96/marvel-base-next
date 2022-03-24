import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { Serie } from 'types/Serie';
import { Wave } from 'types/Wave';
import WavesShow from '@pages/Waves/WavesShow';
import getMenu from '@api/get/front/getMenu';
import getWave from '@api/get/front/getWave';
import getSeries from '@api/get/front/getSeries';

type Props = {
  item: Wave;
  series: Serie[];
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getWave(databaseName, Number(id));

  if (!item) {
    return { notFound: true };
  }

  const series = await getSeries(databaseName, (serie) => serie.wave_id === Number(id));

  const menu = await getMenu();

  return {
    props: {
      title: `- Seria - #${id}`,
      menu,
      item,
      databaseName,
      series,
    },
  };
};

const SeriesShowPage = ({ item, series, databaseName }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <WavesShow item={item} series={series} databaseName={databaseName} />
);

export default SeriesShowPage;
