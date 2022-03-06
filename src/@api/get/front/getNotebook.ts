import { FrontNotebook } from 'types/Notebook';
import get from '@api/get';

const getNotebook = async (databaseName: string, id: number): Promise<FrontNotebook | undefined> => {
  try {
    const { volumes } = await get(databaseName, 'volumes');
    const { series } = await get(databaseName, 'series');
    const volume: Partial<FrontNotebook> = volumes[id];
    volume.id = id;
    volume.serieName = volume.serie_id ? (series[volume.serie_id].name as string) : '';
    return volume as FrontNotebook;
  } catch {
    return undefined;
  }
};

export default getNotebook;
