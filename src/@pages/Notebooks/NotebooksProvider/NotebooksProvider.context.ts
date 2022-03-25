import { createContext } from 'react';
import { Notebook } from 'types/Notebook';
import SelectOption from 'types/SelectOption';
import SetState from 'types/SetState';

export type NotebooksContextType = {
  waveId: string;
  seriesOptions: SelectOption[];
  notebooks: Notebook[];
  volumeNotebooks: Notebook[];
  notebooksIds: number[];
  setNotebooks: SetState<Notebook[]>;
  setWaveId: SetState<string>;
};

export const NotebooksContext = createContext<NotebooksContextType>({
  waveId: '',
  seriesOptions: [],
  notebooks: [],
  volumeNotebooks: [],
  notebooksIds: [],
  setNotebooks: () => {},
  setWaveId: () => {},
});
