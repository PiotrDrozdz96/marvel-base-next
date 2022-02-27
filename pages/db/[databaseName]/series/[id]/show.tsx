import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { FrontSerie } from 'types/Serie';
import SeriesShow from '@pages/Series/SeriesShow';
import getMenu from '@api/get/front/getMenu';
import getSerie from '@api/get/front/getSerie';

type Props = {
  item: FrontSerie;
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getSerie(databaseName, Number(id));

  if (!item) {
    return { notFound: true };
  }

  const menu = await getMenu();

  return {
    props: {
      title: `- Menu - #${id}`,
      menu,
      item,
      databaseName,
    },
  };
};

const SeriesShowPage = ({ item, databaseName }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <SeriesShow item={item} databaseName={databaseName} />
);

export default SeriesShowPage;
