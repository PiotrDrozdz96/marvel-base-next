import { InferGetServerSidePropsType } from 'next';
// eslint-disable-next-line import/no-unresolved
import got from 'got';
import * as $ from 'cheerio';
import { isValid } from 'date-fns';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiNotebook } from 'types/Notebook';
import { Serie } from 'types/Serie';
import { importUrl, nameRegExp } from 'consts/import';
import get from '@api/get';
import getMenu from '@api/get/front/getMenu';
import NotebooksForm from '@pages/Notebooks/NotebooksForm';
import { defaultValues, numberFields } from '@pages/Notebooks/NotebookForm.consts';
import mapApiToFront from 'utils/mapApiToFront';
import convertValuesTo from 'utils/convertValuesTo';
import parseDate from 'utils/parseDate';

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
  const { serie_id: serieId, url } = query as Record<string, string>;

  const menu = await getMenu();
  const { notebooks } = await get(databaseName, 'notebooks');
  const { series } = await get(databaseName, 'series');
  const isCreate = id === 'create';

  if (!isCreate && !notebooks[id]) {
    return { notFound: true };
  }

  let importedNotebook: FormPartial<ApiNotebook> | undefined;

  if (isCreate && url?.startsWith(importUrl)) {
    const response = await got.get(url);
    const $body = $.load(response.body);
    const imageUrl = $body('aside > figure > a > img').attr('src');
    const name = $body('#firstHeading').text();
    const [, title, vol, no] = name.match(nameRegExp) || [];
    const appearing = $body('.mw-parser-output > h2:first-of-type').text();
    const [, subtitle] = appearing.match(/Appearing in ("[^"]+")/) || [];
    const releaseDate = $body('[data-source="ReleaseDate"]').text();
    const date = parseDate(`${releaseDate}, 12:00`);

    importedNotebook = {
      title: title?.trim() || '',
      vol: vol || '',
      no: no || '',
      subtitle: subtitle || '',
      image_url: imageUrl || '',
      date: isValid(date) ? date.toISOString() : '',
      serie_id: serieId || '',
      order: '',
    };
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
        : importedNotebook || { ...defaultValues, serie_id: serieId || defaultValues.serie_id },
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
