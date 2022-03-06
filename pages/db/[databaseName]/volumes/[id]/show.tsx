import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { FrontVolume } from 'types/Volume';
import VolumesShow from '@pages/Volumes/VolumesShow';
import getMenu from '@api/get/front/getMenu';
import getVolume from '@api/get/front/getVolume';

type Props = {
  item: FrontVolume;
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getVolume(databaseName, Number(id));

  if (!item) {
    return { notFound: true };
  }

  const menu = await getMenu();

  return {
    props: {
      title: `- Tom - #${id}`,
      menu,
      item,
      databaseName,
    },
  };
};

const VolumesShowPage = ({ item, databaseName }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <VolumesShow item={item} databaseName={databaseName} />
);

export default VolumesShowPage;
