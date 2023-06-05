import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import FormPartial from 'types/FormPartial';
import { ApiVolume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import get from '@api/get';
import getNotebooks from '@api/get/front/getNotebooks';
import VolumesForm from '@pages/Volumes/VolumesForm';
import { defaultValues, numberFields } from '@pages/Volumes/VolumeForm.consts';
import getMetadata from 'utils/getMetadata';
import mapApiToFront from 'utils/mapApiToFront';
import convertValuesTo from 'utils/convertValuesTo';

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const isCreate = id === 'create';

  return getMetadata(`- Tom ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`);
};

const VolumesFormPage: NextPage = async ({ params, searchParams }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const serieId = searchParams.serie_id as string | undefined;
  const isCreate = id === 'create';

  const { volumes } = await get(databaseName, 'volumes');
  const { waves } = await get(databaseName, 'waves');
  const { series } = await get(databaseName, 'series');

  if (!isCreate && !volumes[id]) {
    notFound();
  }

  const finalSerieId = isCreate ? serieId : `${volumes[id].serie_id}`;

  let waveId = '';
  let volumeNotebooks: Notebook[] = [];

  if (finalSerieId) {
    waveId = `${series[Number(finalSerieId)].wave_id}`;

    if (!isCreate && volumes[id].notebooks?.length) {
      volumeNotebooks = await getNotebooks(volumes[id].notebooks);
    }
  }

  const initialValues = !isCreate
    ? {
        ...(volumes[id] as unknown as FormPartial<ApiVolume>),
        ...convertValuesTo(String, volumes[id], numberFields),
      }
    : {
        ...defaultValues,
        serie_id: serieId || defaultValues.serie_id,
        title: serieId ? series[Number(serieId)]?.name || '' : '',
      };

  return (
    <VolumesForm
      id={isCreate ? undefined : id}
      databaseName={databaseName}
      initialValues={initialValues}
      series={mapApiToFront(series).filter((serie) => serie.wave_id === Number(waveId))}
      events={mapApiToFront(volumes).filter((volume) => volume.is_event)}
      waves={mapApiToFront(waves)}
      waveId={waveId}
      volumeNotebooks={volumeNotebooks}
    />
  );
};

export default VolumesFormPage;
