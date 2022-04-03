import { Filters } from 'types/Filter';
import get from '@api/get';
import sortBy from 'utils/sortBy';

type Props = {
  databaseName: string;
  wavesIds: string[];
  seriesIds: string[];
  keepSeriesIds: number[];
};

const getFilters = async ({
  databaseName,
  wavesIds,
  seriesIds,
  keepSeriesIds,
}: Props): Promise<{ filters: Filters[]; checkedSeries: string[] }> => {
  try {
    const { waves } = await get(databaseName, 'waves');
    const { series } = await get(databaseName, 'series');

    const checkedSeries = [
      ...seriesIds,
      ...wavesIds.reduce<string[]>(
        (acc, waveId) => [
          ...acc,
          ...Object.keys(series).filter((serieId) => series[serieId as unknown as number].wave_id === Number(waveId)),
        ],
        []
      ),
    ];

    const filters: Filters[] = sortBy(
      Object.keys(waves)
        .map((waveId) => {
          const filteredSeries = Object.keys(series).filter(
            (serieId) =>
              series[serieId as unknown as number].wave_id === Number(waveId) &&
              series[Number(serieId)].is_filter &&
              (!keepSeriesIds.length || keepSeriesIds.includes(Number(serieId)))
          );

          const name =
            keepSeriesIds.length && filteredSeries.length === 1
              ? series[filteredSeries[0] as unknown as number].name
              : waves[waveId as unknown as number].name;

          return {
            id: waveId,
            order: waves[waveId as unknown as number].order,
            name,
            checked: wavesIds.includes(waveId),
            hide: !!(keepSeriesIds.length && !filteredSeries.length),
            series: sortBy(
              filteredSeries.length > 1
                ? filteredSeries.map((serieId) => ({
                    id: serieId,
                    order: series[serieId as unknown as number].order,
                    name: series[serieId as unknown as number].name,
                    checked: wavesIds.includes(waveId) || seriesIds.includes(serieId),
                  }))
                : [],
              'order'
            ),
          };
        })
        .filter((filter) => !filter.hide),
      'order'
    );

    return { checkedSeries, filters };
  } catch {
    return { checkedSeries: [], filters: [] };
  }
};

export default getFilters;
