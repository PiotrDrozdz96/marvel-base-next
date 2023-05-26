import { ApiSerie } from 'types/Serie';
import { Wave } from 'types/Wave';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';

export type Props = {
  initialValues: FormPartial<ApiSerie, 'is_filter'>;
  waves: Wave[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
};
