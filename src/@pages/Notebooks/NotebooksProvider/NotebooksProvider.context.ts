import { createContext } from 'react';
import { Notebook } from 'types/Notebook';
import SetState from 'types/SetState';

export type NotebooksContextType = {
  notebooks: Notebook[];
  volumeNotebooks: Notebook[];
  notebooksTitles: string[];
  setNotebooks: SetState<Notebook[]>;
};

export const NotebooksContext = createContext<NotebooksContextType>({
  notebooks: [],
  volumeNotebooks: [],
  notebooksTitles: [],
  setNotebooks: () => {},
});
