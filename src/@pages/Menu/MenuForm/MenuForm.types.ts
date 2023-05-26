import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiMenuItem } from 'types/Menu';

export type Props = {
  menu: { id: number; name: string }[];
  initialValues: FormPartial<ApiMenuItem>;
  variant: FormVariant;
  itemId?: number;
};
