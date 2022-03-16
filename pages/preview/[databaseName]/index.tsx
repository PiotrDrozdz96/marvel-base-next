import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { Volume } from 'types/Volume';
import getMenu from '@api/get/front/getMenu';
import Preview from '@pages/Preview';
import getVolumes from '@api/get/front/getVolumes';

type Props = {
  volumes: Volume[];
  databaseName: string;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const id = params?.databaseName as string;

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();
  const volumes = await getVolumes(id, () => true, 'global_order');

  if (!volumes) {
    return { notFound: true };
  }

  return {
    props: {
      menu,
      title: `- Baza #${id}`,
      volumes,
      databaseName: id,
    },
  };
};

const DatabasePage = ({ volumes, databaseName }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Preview volumes={volumes} databaseName={databaseName} />
);

export default DatabasePage;
