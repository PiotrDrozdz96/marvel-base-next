import { FrontVolume } from 'types/Volume';
import get from '@api/get';

const getVolume = async (databaseName: string, id: number): Promise<FrontVolume | undefined> => {
  try {
    const { volumes } = await get(databaseName, 'volumes');
    const { series } = await get(databaseName, 'series');
    const volume: Partial<FrontVolume> = volumes[id];
    volume.id = id;
    volume.serieName = volume.serie_id ? (series[volume.serie_id].name as string) : '';

    if (volume.notebooks_ids?.length) {
      const { notebooks } = await get(databaseName, 'notebooks');
      volume.notebooks = volume.notebooks_ids.map((notebookId) => ({ ...notebooks[notebookId], id: notebookId }));
    } else {
      volume.notebooks = [];
    }
    return volume as FrontVolume;
  } catch {
    return undefined;
  }
};

export default getVolume;
