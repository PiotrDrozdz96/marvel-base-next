import FormPartial from 'types/FormPartial';
import { ApiMenuItem } from 'types/Menu';
import SelectOption from 'types/SelectOption';

export const defaultValues: FormPartial<ApiMenuItem> = {
  name: '',
  type: '',
  order: '',
  url: '',
  icon: '',
  parent_id: '',
};

export const typeOptions: SelectOption[] = [
  { value: 'SUB_MENU', label: 'SUB_MENU' },
  { value: 'MAIN_MENU', label: 'MAIN_MENU' },
];

export const iconOptions: SelectOption[] = [
  { value: 'home', label: 'Home' },
  { value: 'tv', label: 'Tv' },
  { value: 'reader', label: 'Reader' },
];
