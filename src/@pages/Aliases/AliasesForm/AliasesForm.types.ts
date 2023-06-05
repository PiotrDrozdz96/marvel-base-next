import { Alias } from 'types/Alias';
import FormPartial from 'types/FormPartial';

export type Props = {
  initialValues: FormPartial<Alias>;
  databaseName: string;
};
