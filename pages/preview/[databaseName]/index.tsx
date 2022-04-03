import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { Volume } from 'types/Volume';
import { Filters } from 'types/Filter';
import getMenu from '@api/get/front/getMenu';
import Preview from '@pages/Preview';
import getVolumes from '@api/get/front/getVolumes';
import getFilters from '@api/get/front/getFilters';
import get from '@api/get';
import getSearchParams from 'utils/getSearchParams';

type Props = {
  volumes: Volume[];
  databaseName: string;
  filters: Filters[];
  wavesIds: string[];
  seriesIds: string[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params, query }) => {
  const id = params?.databaseName as string;

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();
  const volumes = await getVolumes(id, (volume) => !volume.is_event, 'global_order');

  let wavesIds: string[] = [];
  let seriesIds: string[] = [];
  const { wavesIds: wavesIdsString, seriesIds: seriesIdsString, alias } = query as Record<string, string>;

  if (alias) {
    const aliases = await get(id, 'aliases');
    const searchParams = aliases[alias]?.params;

    if (!searchParams) {
      return { notFound: true };
    }
    const { wavesIds: aliasWavesIds, seriesIds: aliasSeriesIds } = getSearchParams(searchParams);
    wavesIds = aliasWavesIds ? JSON.parse(aliasWavesIds).map(String) || [] : [];
    seriesIds = aliasSeriesIds ? JSON.parse(aliasSeriesIds).map(String) || [] : [];
  } else {
    wavesIds = wavesIdsString ? JSON.parse(wavesIdsString).map(String) || [] : [];
    seriesIds = seriesIdsString ? JSON.parse(seriesIdsString).map(String) || [] : [];
  }

  const { filters, checkedSeries } = await getFilters(id, wavesIds, seriesIds);

  if (!volumes) {
    return { notFound: true };
  }

  return {
    props: {
      menu,
      title: `- Baza #${id}`,
      volumes: volumes.filter((volume) => checkedSeries.includes(`${volume.serie_id}`)),
      filters,
      databaseName: id,
      wavesIds,
      seriesIds,
    },
  };
};

const DatabasePage = ({
  volumes,
  databaseName,
  filters,
  wavesIds,
  seriesIds,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Preview volumes={volumes} databaseName={databaseName} filters={filters} wavesIds={wavesIds} seriesIds={seriesIds} />
);

export default DatabasePage;
