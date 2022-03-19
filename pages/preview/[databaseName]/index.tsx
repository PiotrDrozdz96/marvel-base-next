import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import { Volume } from 'types/Volume';
import { Filters } from 'types/Filter';
import getMenu from '@api/get/front/getMenu';
import Preview from '@pages/Preview';
import getVolumes from '@api/get/front/getVolumes';
import getFilters from '@api/get/front/getFilters';

type Props = {
  volumes: Volume[];
  databaseName: string;
  filters: Filters[];
  wavesIds: string[];
  seriesIds: string[];
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params, query }) => {
  const id = params?.databaseName as string;
  const { wavesIds: wavesIdsString, seriesIds: seriesIdsString } = query as Record<string, string>;

  const wavesIds = wavesIdsString ? JSON.parse(wavesIdsString).map(String) || [] : [];
  const seriesIds = seriesIdsString ? JSON.parse(seriesIdsString).map(String) || [] : [];

  if (!id) {
    return { notFound: true };
  }

  const menu = await getMenu();
  const volumes = await getVolumes(id, () => true, 'global_order');
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
