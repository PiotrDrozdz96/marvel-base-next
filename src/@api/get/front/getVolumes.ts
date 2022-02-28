import { Volume } from 'types/Volume';
import get from '@api/get';
import mapApiToFront from 'utils/mapApiToFront';

type VolumeFilter = (volume: Volume) => boolean;

const defaultFilter = () => true;

const getVolumes = async (databaseName: string, filter: VolumeFilter = defaultFilter): Promise<Volume[]> => {
  const { volumes } = await get(databaseName, 'volumes');
  const volumesArray = mapApiToFront(volumes);

  return volumesArray.filter(filter);
};

export default getVolumes;
