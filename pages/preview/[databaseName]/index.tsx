import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { FrontVolume, Volume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import { Filters } from 'types/Filter';
import getMenu from '@api/get/front/getMenu';
import Preview from '@pages/Preview';
import getVolume from '@api/get/front/getVolume';
import getVolumes from '@api/get/front/getVolumes';
import getFilters from '@api/get/front/getFilters';
import get from '@api/get';
import getSearchParams from 'utils/getSearchParams';

type Props = {
  items: (Volume | Notebook)[];
  databaseName: string;
  filters: Filters[];
  wavesIds: string[];
  seriesIds: string[];
  isEvent: boolean;
  volume: FrontVolume | null;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params, query }) => {
  const id = params?.databaseName as string;

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();

  const { wavesIds: wavesIdsString, seriesIds: seriesIdsString, alias } = query as Record<string, string>;
  const volumeId = Number(alias);
  const isEvent = !!volumeId;

  let finalWavesIdsString = '';
  let finalSeriesIdsString = '';

  if (alias) {
    const aliases = await get(id, 'aliases');
    const searchParams = aliases[alias]?.params;

    if (isEvent && (wavesIdsString || seriesIdsString)) {
      [finalWavesIdsString, finalSeriesIdsString] = [wavesIdsString, seriesIdsString];
    } else if (searchParams) {
      const { wavesIds: aliasWavesIds, seriesIds: aliasSeriesIds } = getSearchParams(searchParams);
      [finalWavesIdsString, finalSeriesIdsString] = [aliasWavesIds, aliasSeriesIds];
    } else {
      [finalWavesIdsString, finalSeriesIdsString] = [wavesIdsString, seriesIdsString];
    }
  } else {
    [finalWavesIdsString, finalSeriesIdsString] = [wavesIdsString, seriesIdsString];
  }

  const wavesIds = finalWavesIdsString ? JSON.parse(finalWavesIdsString).map(String) || [] : [];
  const seriesIds = finalSeriesIdsString ? JSON.parse(finalSeriesIdsString).map(String) || [] : [];

  let volume: FrontVolume | undefined;
  let items: (Volume | Notebook)[] = [];

  if (!isEvent) {
    items = await getVolumes(id, (item) => !item.is_event, 'global_order');
  } else {
    volume = await getVolume(id, volumeId);
    const { notebooks } = await get(id, 'notebooks');
    items = volume?.notebooks_ids.map((notebookId) => ({ ...notebooks[notebookId], id: notebookId })) || [];
  }

  const keepSeriesIds = isEvent ? [...new Set(items.map((item) => item.serie_id))] : [];

  const { filters, checkedSeries } = await getFilters({ databaseName: id, wavesIds, seriesIds, keepSeriesIds });

  if (!items) {
    return { notFound: true };
  }

  return {
    props: {
      menu,
      title: `- Baza #${id}`,
      items: items.filter((item) => checkedSeries.includes(`${item.serie_id}`)),
      filters,
      databaseName: id,
      wavesIds,
      seriesIds,
      isEvent,
      volume: volume || null,
    },
  };
};

const DatabasePage = ({
  items,
  databaseName,
  filters,
  wavesIds,
  seriesIds,
  isEvent,
  volume,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Preview
    items={items}
    databaseName={databaseName}
    filters={filters}
    wavesIds={wavesIds}
    seriesIds={seriesIds}
    isEvent={isEvent}
    volume={volume || undefined}
  />
);

export default DatabasePage;
