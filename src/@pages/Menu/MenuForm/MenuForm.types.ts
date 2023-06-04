import FormPartial from 'types/FormPartial';
import { ApiMenuItem } from 'types/Menu';

export type Props = {
  menu: { id: number; name: string }[];
  initialValues: FormPartial<ApiMenuItem>;
  itemId?: number;
};
