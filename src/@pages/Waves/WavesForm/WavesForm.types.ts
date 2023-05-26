import { ApiWave } from 'types/Wave';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';

export type Props = {
  initialValues: FormPartial<ApiWave>;
  variant: FormVariant;
  databaseName: string;
  id?: number;
};
