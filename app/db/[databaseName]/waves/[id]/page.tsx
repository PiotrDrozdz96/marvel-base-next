import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import FormPartial from 'types/FormPartial';
import { ApiWave } from 'types/Wave';
import get from '@api/get';
import WavesForm from '@pages/Waves/WavesForm';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const isCreate = id === 'create';

  return getMetadata(`- Nurt ${databaseName} - ${isCreate ? 'Create' : `#${id}`}`);
};

const WavesFormPage: NextPage = async ({ params }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const isCreate = id === 'create';

  const { waves } = await get(databaseName, 'waves');

  if (!isCreate && !waves[id]) {
    notFound();
  }

  const initialValues = !isCreate ? (waves[id] as unknown as FormPartial<ApiWave>) : { name: '', order: '' };

  return (
    <WavesForm
      variant={isCreate ? 'create' : 'edit'}
      id={isCreate ? undefined : id}
      databaseName={databaseName}
      initialValues={initialValues}
    />
  );
};

export default WavesFormPage;
