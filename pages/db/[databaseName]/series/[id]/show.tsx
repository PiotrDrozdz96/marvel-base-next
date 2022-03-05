import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { Volume } from 'types/Volume';
import { FrontSerie } from 'types/Serie';
import SeriesShow from '@pages/Series/SeriesShow';
import getMenu from '@api/get/front/getMenu';
import getSerie from '@api/get/front/getSerie';
import getVolumes from '@api/get/front/getVolumes';

type Props = {
  item: FrontSerie;
  volumes: Volume[];
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getSerie(databaseName, Number(id));
  const volumes = await getVolumes(databaseName, (volume) => volume.serie_id === Number(id));

  if (!item) {
    return { notFound: true };
  }

  const menu = await getMenu();

  return {
    props: {
      title: `- Seria - #${id}`,
      menu,
      item,
      volumes,
      databaseName,
    },
  };
};

const SeriesShowPage = ({ item, volumes, databaseName }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <SeriesShow item={item} volumes={volumes} databaseName={databaseName} />
);

export default SeriesShowPage;
