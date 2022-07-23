import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { FrontVolume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import VolumesShow from '@pages/Volumes/VolumesShow';
import getMenu from '@api/get/front/getMenu';
import getVolume from '@api/get/front/getVolume';
import getNotebooks from '@api/get/front/getNotebooks';

type Props = {
  item: FrontVolume;
  notebooks: Notebook[];
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getVolume(databaseName, Number(id));

  if (!item) {
    return { notFound: true };
  }

  // if (item.is_event) {
  //   return {
  //     redirect: {
  //       destination: `/preview/${databaseName}/${id}`,
  //     },
  //   } as unknown as { props: InferGetServerSidePropsType<typeof getServerSideProps> };
  // }

  let volumeNotebooks: Notebook[] = [];

  if (item.notebooks?.length) {
    volumeNotebooks = await getNotebooks(item.notebooks);
  }

  const menu = await getMenu();

  return {
    props: {
      title: `- Tom - #${id}`,
      menu,
      item,
      databaseName,
      notebooks: volumeNotebooks,
    },
  };
};

const VolumesShowPage = ({ item, databaseName, notebooks }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <VolumesShow item={item} databaseName={databaseName} notebooks={notebooks} />
);

export default VolumesShowPage;
