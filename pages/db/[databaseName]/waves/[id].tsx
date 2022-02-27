import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiWave } from 'types/Wave';
import get from '@api/get';
import getMenu from '@api/get/front/getMenu';
import WavesForm from '@pages/Waves/WavesForm';

type Props = {
  variant: FormVariant;
  id: number | null;
  databaseName: string;
  initialValues: FormPartial<ApiWave>;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';

  const menu = await getMenu();
  const { waves } = await get(databaseName, 'waves');
  const isCreate = id === 'create';

  if (!isCreate && !waves[id]) {
    return { notFound: true };
  }

  return {
    props: {
      title: `- Nurt ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`,
      menu,
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      databaseName,
      initialValues: !isCreate ? (waves[id] as unknown as FormPartial<ApiWave>) : { name: '', order: '' },
    },
  };
};

const WavesFormPage = ({
  variant,
  id,
  databaseName,
  initialValues,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <WavesForm variant={variant} id={id || undefined} databaseName={databaseName} initialValues={initialValues} />
);

export default WavesFormPage;
