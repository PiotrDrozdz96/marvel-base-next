import FormPartial from 'types/FormPartial';
import { ApiSerie } from 'types/Serie';

export const defaultValues: FormPartial<ApiSerie> = {
  name: '',
  order: '',
  wave_id: '',
};

export const numberFields: (keyof ApiSerie)[] = ['order', 'wave_id'];
