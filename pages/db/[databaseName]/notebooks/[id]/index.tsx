import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiNotebook } from 'types/Notebook';
import { Serie } from 'types/Serie';
import get from '@api/get';
import getMenu from '@api/get/front/getMenu';
import NotebooksForm from '@pages/Notebooks/NotebooksForm';
import { defaultValues, numberFields } from '@pages/Notebooks/NotebookForm.consts';
import mapApiToFront from 'utils/mapApiToFront';
import convertValuesTo from 'utils/convertValuesTo';

type Props = {
  variant: FormVariant;
  id: number | null;
  databaseName: string;
  initialValues: FormPartial<ApiNotebook>;
  series: Serie[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params, query }) => {
  const databaseName = params?.databaseName as string;
  const id = params?.id as number | 'create';
  const serieId = query.serie_id as string | undefined;

  const menu = await getMenu();
  const { notebooks } = await get(databaseName, 'notebooks');
  const { series } = await get(databaseName, 'series');
  const isCreate = id === 'create';

  if (!isCreate && !notebooks[id]) {
    return { notFound: true };
  }

  return {
    props: {
      title: `- Zeszyt ${databaseName}- ${isCreate ? 'Create' : `#${id}`}`,
      menu,
      variant: isCreate ? 'create' : 'edit',
      id: isCreate ? null : id,
      databaseName,
      series: mapApiToFront(series),
      initialValues: !isCreate
        ? {
            ...(notebooks[id] as unknown as FormPartial<ApiNotebook>),
            ...convertValuesTo(String, notebooks[id], numberFields),
          }
        : { ...defaultValues, serie_id: serieId || defaultValues.serie_id },
    },
  };
};

const NotebooksFormPage = ({
  variant,
  id,
  databaseName,
  initialValues,
  series,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <NotebooksForm
    variant={variant}
    id={id || undefined}
    databaseName={databaseName}
    initialValues={initialValues}
    series={series}
  />
);

export default NotebooksFormPage;
