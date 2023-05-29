// todo use server

import { Volume } from 'types/Volume';
import OrderField from 'types/OrderField';
import get from '@api/get';
import mapApiToFront from 'utils/mapApiToFront';

type VolumeFilter = (volume: Volume) => boolean;

const defaultFilter = () => true;

const getVolumes = async (
  databaseName: string,
  filter: VolumeFilter = defaultFilter,
  order: OrderField = 'order'
): Promise<Volume[]> => {
  const { volumes } = await get(databaseName, 'volumes');
  const volumesArray = mapApiToFront(volumes, order);

  return volumesArray.filter(filter);
};

export default getVolumes;
