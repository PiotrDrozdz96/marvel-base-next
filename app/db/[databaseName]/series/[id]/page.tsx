import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import FormPartial from 'types/FormPartial';
import { ApiSerie } from 'types/Serie';
import get from '@api/get';
import SeriesForm from '@pages/Series/SeriesForm';
import { defaultValues, numberFields } from '@pages/Series/SeriesForm.consts';
import getMetadata from 'utils/getMetadata';
import mapApiToFront from 'utils/mapApiToFront';
import convertValuesTo from 'utils/convertValuesTo';

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const isCreate = id === 'create';

  return getMetadata(`- Seria ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`);
};

const SeriesFormPage: NextPage = async ({ params, searchParams }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const waveId = searchParams?.wave_id as string;
  const isCreate = id === 'create';

  const { waves } = await get(databaseName, 'waves');
  const { series } = await get(databaseName, 'series');

  if (!isCreate && !series[id]) {
    notFound();
  }

  const initialValues = !isCreate
    ? {
        ...(series[id] as unknown as FormPartial<ApiSerie, 'is_filter'>),
        ...convertValuesTo(String, series[id], numberFields),
      }
    : { ...defaultValues, wave_id: waveId || defaultValues.wave_id };

  return (
    <SeriesForm
      id={isCreate ? undefined : id}
      databaseName={databaseName}
      initialValues={initialValues}
      waves={mapApiToFront(waves)}
    />
  );
};

export default SeriesFormPage;
