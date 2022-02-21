import FormPartial from 'types/FormPartial';
import { ApiMenuItem } from 'types/Menu';

export const defaultValues: FormPartial<ApiMenuItem> = {
  name: '',
  type: '',
  order: '',
  url: '',
  icon: '',
  parent_id: '',
};
