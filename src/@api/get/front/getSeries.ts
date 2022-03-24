import { Serie } from 'types/Serie';
import get from '@api/get';
import mapApiToFront from 'utils/mapApiToFront';

type SeriesFilter = (volume: Serie) => boolean;

const defaultFilter = () => true;

const getNotebooks = async (databaseName: string, filter: SeriesFilter = defaultFilter): Promise<Serie[]> => {
  const { series } = await get(databaseName, 'series');
  const notebooksArray = mapApiToFront(series);

  return notebooksArray.filter(filter);
};

export default getNotebooks;
