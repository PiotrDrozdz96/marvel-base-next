import { Filters } from 'types/Filter';
import get from '@api/get';
import sortBy from 'utils/sortBy';

type Props = {
  databaseName: string;
  wavesIds: string[];
  seriesIds: string[];
};

const getFilters = async ({
  databaseName,
  wavesIds,
  seriesIds,
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
      Object.keys(waves).map((waveId) => {
        const filteredSeries = Object.keys(series).filter(
          (serieId) => series[serieId as unknown as number].wave_id === Number(waveId)
        );

        return {
          id: waveId,
          order: waves[waveId as unknown as number].order,
          name: waves[waveId as unknown as number].name,
          checked: wavesIds.includes(waveId),
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
      }),
      'order'
    );

    return { checkedSeries, filters };
  } catch {
    return { checkedSeries: [], filters: [] };
  }
};

export default getFilters;
