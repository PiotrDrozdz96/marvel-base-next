import { FrontNotebook } from 'types/Notebook';
import get from '@api/get';

const getNotebook = async (databaseName: string, id: number): Promise<FrontNotebook | undefined> => {
  try {
    const { notebooks } = await get(databaseName, 'notebooks');
    const { series } = await get(databaseName, 'series');

    const notebook: Partial<FrontNotebook> = notebooks[id];
    notebook.id = id;
    notebook.serieName = notebook.serie_id ? (series[notebook.serie_id].name as string) : '';
    return notebook as FrontNotebook;
  } catch {
    return undefined;
  }
};

export default getNotebook;
