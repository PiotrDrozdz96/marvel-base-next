'use client';

import { createContext } from 'react';

import { ApiNotebook } from 'types/Notebook';
import SetState from 'types/SetState';

export type NotebooksContextType = {
  notebooks: ApiNotebook[];
  volumeNotebooks: ApiNotebook[];
  notebooksTitles: string[];
  setNotebooks: SetState<ApiNotebook[]>;
};

export const NotebooksContext = createContext<NotebooksContextType>({
  notebooks: [],
  volumeNotebooks: [],
  notebooksTitles: [],
  setNotebooks: () => {},
});
