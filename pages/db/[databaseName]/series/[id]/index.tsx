import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiSerie } from 'types/Serie';
import { Wave } from 'types/Wave';
import get from '@api/get';
import getMenu from '@api/get/front/getMenu';
import SeriesForm from '@pages/Series/SeriesForm';
import mapApiToFront from 'utils/mapApiToFront';

type Props = {
  variant: FormVariant;
  id: number | null;
  databaseName: string;
  initialValues: FormPartial<ApiSerie>;
  waves: Wave[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';

  const menu = await getMenu();
  const { waves } = await get(databaseName, 'waves');
  const { series } = await get(databaseName, 'series');
  const isCreate = id === 'create';

  if (!isCreate && !series[id]) {
    return { notFound: true };
  }

  return {
    props: {
      title: `- Seria ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`,
      menu,
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      databaseName,
      waves: mapApiToFront(waves),
      initialValues: !isCreate
        ? (series[id] as unknown as FormPartial<ApiSerie>)
        : { name: '', order: '', wave_id: '' },
    },
  };
};

const SeriesFormPage = ({
  variant,
  id,
  databaseName,
  initialValues,
  waves,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <SeriesForm
    variant={variant}
    id={id || undefined}
    databaseName={databaseName}
    initialValues={initialValues}
    waves={waves}
  />
);

export default SeriesFormPage;
