import { Notebook } from 'types/Notebook';
import get from '@api/get';
import mapApiToFront from 'utils/mapApiToFront';

type NotebookFilter = (volume: Notebook) => boolean;

const defaultFilter = () => true;

const getNotebooks = async (databaseName: string, filter: NotebookFilter = defaultFilter): Promise<Notebook[]> => {
  const { notebooks } = await get(databaseName, 'notebooks');
  const notebooksArray = mapApiToFront(notebooks);

  return notebooksArray.filter(filter);
};

export default getNotebooks;
