import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiVolume } from 'types/Volume';
import { Serie } from 'types/Serie';
import { Notebook } from 'types/Notebook';
import get from '@api/get';
import getMenu from '@api/get/front/getMenu';
import getNotebooks from '@api/get/front/getNotebooks';
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
  notebooks: Notebook[];
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

  let notebooks: Notebook[] = [];

  if ((isCreate && serieId) || (!isCreate && volumes[id].serie_id)) {
    notebooks = await getNotebooks(databaseName, (notebook) =>
      isCreate ? notebook.serie_id === Number(serieId) : notebook.serie_id === volumes[id].serie_id
    );
  }

  return {
    props: {
      title: `- Tom ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`,
      menu,
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      databaseName,
      series: mapApiToFront(series),
      notebooks,
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
  notebooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <VolumesForm
    variant={variant}
    id={id || undefined}
    databaseName={databaseName}
    initialValues={initialValues}
    series={series}
    notebooks={notebooks}
  />
);

export default NotebooksFormPage;
