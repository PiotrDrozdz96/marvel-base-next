import FormPartial from 'types/FormPartial';
import { Notebook } from 'types/Notebook';
import { Serie } from 'types/Serie';
import { Wave } from 'types/Wave';
import { ApiVolume, Volume } from 'types/Volume';

export type Props = {
  initialValues: FormPartial<ApiVolume>;
  waves: Wave[];
  series: Serie[];
  events: Volume[];
  volumeNotebooks: Notebook[];
  databaseName: string;
  id?: number;
  waveId: string;
};
