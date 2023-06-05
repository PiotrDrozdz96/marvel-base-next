import { ApiWave } from 'types/Wave';
import FormPartial from 'types/FormPartial';

export type Props = {
  initialValues: FormPartial<ApiWave>;
  databaseName: string;
  id?: number;
};
