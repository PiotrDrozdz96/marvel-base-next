import { createContext } from 'react';
import { Notebook } from 'types/Notebook';
import SetState from 'types/SetState';

export type NotebooksContextType = {
  notebooks: Notebook[];
  volumeNotebooks: Notebook[];
  notebooksIds: number[];
  setNotebooks: SetState<Notebook[]>;
};

export const NotebooksContext = createContext<NotebooksContextType>({
  notebooks: [],
  volumeNotebooks: [],
  notebooksIds: [],
  setNotebooks: () => {},
});
