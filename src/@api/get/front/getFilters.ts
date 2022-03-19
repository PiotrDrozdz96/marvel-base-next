import { Filters } from 'types/Filter';
import get from '@api/get';

const getVolume = async (
  databaseName: string,
  wavesIds: string[],
  seriesIds: string[]
): Promise<{ filters: Filters[]; checkedSeries: string[] }> => {
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

    const filters: Filters[] = Object.keys(waves).map((waveId) => {
      const filteredSeries = Object.keys(series).filter(
        (serieId) => series[serieId as unknown as number].wave_id === Number(waveId)
      );

      return {
        id: waveId,
        name: waves[waveId as unknown as number].name,
        checked: wavesIds.includes(waveId),
        series:
          filteredSeries.length > 1
            ? filteredSeries.map((serieId) => ({
                id: serieId,
                name: series[serieId as unknown as number].name,
                checked: wavesIds.includes(waveId) || seriesIds.includes(serieId),
              }))
            : [],
      };
    });

    return { checkedSeries, filters };
  } catch {
    return { checkedSeries: [], filters: [] };
  }
};

export default getVolume;
