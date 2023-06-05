import { notFound } from 'next/navigation';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import Preview from '@pages/Preview';
import getVolumes from '@api/get/front/getVolumes';
import getFilters from '@api/get/front/getFilters';
import get from '@api/get';
import getSearchParams from 'utils/getSearchParams';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => getMetadata(`- Baza #${params?.databaseName}`);

const PreviewPage: NextPage = async ({ params, searchParams }) => {
  const id = params?.databaseName as string;

  if (!id) {
    notFound();
  }

  const { wavesIds: wavesIdsString, seriesIds: seriesIdsString, alias } = searchParams;

  let finalWavesIdsString = '';
  let finalSeriesIdsString = '';

  if (alias) {
    const aliases = await get(id, 'aliases');
    const finalSearchParams = aliases[alias]?.params;

    if (finalSearchParams) {
      const { wavesIds: aliasWavesIds, seriesIds: aliasSeriesIds } = getSearchParams(finalSearchParams);
      [finalWavesIdsString, finalSeriesIdsString] = [aliasWavesIds, aliasSeriesIds];
    } else {
      [finalWavesIdsString, finalSeriesIdsString] = [wavesIdsString, seriesIdsString];
    }
  } else {
    [finalWavesIdsString, finalSeriesIdsString] = [wavesIdsString, seriesIdsString];
  }

  const wavesIds = finalWavesIdsString ? JSON.parse(finalWavesIdsString).map(String) || [] : [];
  const seriesIds = finalSeriesIdsString ? JSON.parse(finalSeriesIdsString).map(String) || [] : [];

  const items = await getVolumes(id, (item) => !item.is_event, 'global_order');

  const { filters, checkedSeries } = await getFilters({ databaseName: id, wavesIds, seriesIds });

  if (!items) {
    notFound();
  }

  return (
    <Preview
      items={items.filter((item) => checkedSeries.includes(`${item.serie_id}`))}
      databaseName={id}
      filters={filters}
      wavesIds={wavesIds}
      seriesIds={seriesIds}
    />
  );
};

export default PreviewPage;
