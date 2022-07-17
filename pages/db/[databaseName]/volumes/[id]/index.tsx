import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiVolume, Volume } from 'types/Volume';
import { Serie } from 'types/Serie';
import { Wave } from 'types/Wave';
import { Notebook } from 'types/Notebook';
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
  events: Volume[];
  series: Serie[];
  waves: Wave[];
  waveId: string;
  volumeNotebooks: Notebook[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params, query }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const serieId = query.serie_id as string | undefined;

  const menu = await getMenu();
  const { volumes } = await get(databaseName, 'volumes');
  const { waves } = await get(databaseName, 'waves');
  const { series } = await get(databaseName, 'series');
  const isCreate = id === 'create';

  if (!isCreate && !volumes[id]) {
    return { notFound: true };
  }

  const finalSerieId = isCreate ? serieId : `${volumes[id].serie_id}`;

  let waveId = '';
  let volumeNotebooks: Notebook[] = [];

  if (finalSerieId) {
    waveId = `${series[Number(finalSerieId)].wave_id}`;
    const { notebooks: allNotebooks } = await get(databaseName, 'notebooks');

    if (!isCreate && volumes[id].notebooks_ids?.length) {
      volumeNotebooks = volumes[id].notebooks_ids.map((notebookId) => ({
        ...allNotebooks[notebookId],
        id: notebookId,
      }));
    }
  }

  return {
    props: {
      title: `- Tom ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`,
      menu,
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      databaseName,
      series: mapApiToFront(series).filter((serie) => serie.wave_id === Number(waveId)),
      events: mapApiToFront(volumes).filter((volume) => volume.is_event),
      waves: mapApiToFront(waves),
      volumeNotebooks,
      waveId,
      initialValues: !isCreate
        ? {
            ...(volumes[id] as unknown as FormPartial<ApiVolume>),
            ...convertValuesTo(String, volumes[id], numberFields),
          }
        : {
            ...defaultValues,
            serie_id: serieId || defaultValues.serie_id,
            title: serieId ? series[Number(serieId)]?.name || '' : '',
          },
    },
  };
};

const NotebooksFormPage = ({
  variant,
  id,
  databaseName,
  initialValues,
  series,
  events,
  waves,
  waveId,
  volumeNotebooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <VolumesForm
    variant={variant}
    id={id || undefined}
    databaseName={databaseName}
    initialValues={initialValues}
    series={series}
    events={events}
    waves={waves}
    waveId={waveId}
    volumeNotebooks={volumeNotebooks}
  />
);

export default NotebooksFormPage;
