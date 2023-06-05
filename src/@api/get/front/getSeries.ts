import { Serie } from 'types/Serie';
import get from '@api/get';
import mapApiToFront from 'utils/mapApiToFront';

const getSeries = async (databaseName: string, waveId?: number): Promise<Serie[]> => {
  const { series } = await get(databaseName, 'series');
  const seriesArray = mapApiToFront(series);

  return waveId ? seriesArray.filter((serie) => serie.wave_id === waveId) : seriesArray;
};

export default getSeries;
