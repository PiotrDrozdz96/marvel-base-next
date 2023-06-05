import { ApiSerie } from 'types/Serie';
import { Wave } from 'types/Wave';
import FormPartial from 'types/FormPartial';

export type Props = {
  initialValues: FormPartial<ApiSerie, 'is_filter'>;
  waves: Wave[];
  databaseName: string;
  id?: number;
};
