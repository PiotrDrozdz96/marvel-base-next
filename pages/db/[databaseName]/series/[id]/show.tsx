import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { Volume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import { FrontSerie } from 'types/Serie';
import SeriesShow from '@pages/Series/SeriesShow';
import getMenu from '@api/get/front/getMenu';
import getSerie from '@api/get/front/getSerie';
import getVolumes from '@api/get/front/getVolumes';
import getNotebooks from '@api/get/front/getNotebooks';

type Props = {
  item: FrontSerie;
  volumes: Volume[];
  notebooks: Notebook[];
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getSerie(databaseName, Number(id));
  const volumes = await getVolumes(databaseName, (volume) => volume.serie_id === Number(id));
  const notebooks = await getNotebooks(databaseName, (notebook) => notebook.serie_id === Number(id));

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
      notebooks,
      databaseName,
    },
  };
};

const SeriesShowPage = ({
  item,
  volumes,
  notebooks,
  databaseName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <SeriesShow item={item} volumes={volumes} notebooks={notebooks} databaseName={databaseName} />
);

export default SeriesShowPage;
