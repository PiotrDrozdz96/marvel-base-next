import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiVolume } from 'types/Volume';
import { Serie } from 'types/Serie';
import get from '@api/get';
import getMenu from '@api/get/front/getMenu';
import VolumesForm from '@pages/Volumes/VolumesForm';
import { defaultValues, numberFields } from '@pages/Volumes/VolumeForm.consts';
import mapApiToFront from 'utils/mapApiToFront';
import convertValuesTo from 'utils/convertValuesTo';

type Props = {
  variant: FormVariant;
  id: number | null;
  databaseName: string;
  initialValues: FormPartial<ApiVolume>;
  series: Serie[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params, query }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const serieId = query.serie_id as string | undefined;

  const menu = await getMenu();
  const { volumes } = await get(databaseName, 'volumes');
  const { series } = await get(databaseName, 'series');
  const isCreate = id === 'create';

  if (!isCreate && !volumes[id]) {
    return { notFound: true };
  }

  return {
    props: {
      title: `- Tom ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`,
      menu,
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      databaseName,
      series: mapApiToFront(series),
      initialValues: !isCreate
        ? {
            ...(volumes[id] as unknown as FormPartial<ApiVolume>),
            ...convertValuesTo(String, volumes[id], numberFields),
          }
        : { ...defaultValues, serie_id: serieId || defaultValues.serie_id },
    },
  };
};

const WavesFormPage = ({
  variant,
  id,
  databaseName,
  initialValues,
  series,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <VolumesForm
    variant={variant}
    id={id || undefined}
    databaseName={databaseName}
    initialValues={initialValues}
    series={series}
  />
);

export default WavesFormPage;
