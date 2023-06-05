import { Wave } from 'types/Wave';
import get from '@api/get';

const getWave = async (databaseName: string, id: number): Promise<Wave | undefined> => {
  try {
    const { waves } = await get(databaseName, 'waves');
    const wave = waves[id];
    return wave ? { ...wave, id } : undefined;
  } catch {
    return undefined;
  }
};

export default getWave;
