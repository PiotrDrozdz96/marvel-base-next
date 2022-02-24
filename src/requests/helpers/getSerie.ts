import { FrontSerie } from 'types/Serie';
import get from 'requests/api/get';

const getSerie = async (databaseName: string, id: number): Promise<FrontSerie | undefined> => {
  try {
    const { series } = await get(databaseName, 'series');
    const { waves } = await get(databaseName, 'waves');
    const serie: Partial<FrontSerie> = series[id];
    serie.id = id;
    serie.waveName = serie.wave_id ? (waves[serie.wave_id].name as string) : '';
    return serie as FrontSerie;
  } catch {
    return undefined;
  }
};

export default getSerie;
