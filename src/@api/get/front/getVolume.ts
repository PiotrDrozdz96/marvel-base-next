'use server';

import { FrontVolume } from 'types/Volume';
import get from '@api/get';

const getVolume = async (databaseName: string, id: number): Promise<FrontVolume | undefined> => {
  try {
    const { volumes } = await get(databaseName, 'volumes');
    const { series } = await get(databaseName, 'series');
    const volume: Partial<FrontVolume> = volumes[id];
    volume.id = id;
    volume.serieName = volume.serie_id ? series[volume.serie_id].name : '';
    volume.eventName = volume.event_id ? volumes[volume.event_id].title : '';

    return volume as FrontVolume;
  } catch {
    return undefined;
  }
};

export default getVolume;
