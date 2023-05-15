import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import { Notebook } from 'types/Notebook';
import getVolume from '@api/get/front/getVolume';
import getNotebooks from '@api/get/front/getNotebooks';
import VolumesShow from '@pages/Volumes/VolumesShow';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => getMetadata(`- Tom #${params.id}`);

const VolumesShowPage: NextPage = async ({ params }) => {
  const { databaseName, id } = params as Record<string, string>;

  const item = await getVolume(databaseName, Number(id));

  if (!item) {
    notFound();
  }

  let volumeNotebooks: Notebook[] = [];

  if (item.notebooks?.length) {
    volumeNotebooks = await getNotebooks(item.notebooks);
  }

  return <VolumesShow item={item} databaseName={databaseName} notebooks={volumeNotebooks} />;
};

export default VolumesShowPage;
