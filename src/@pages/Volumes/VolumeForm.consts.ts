import FormPartial from 'types/FormPartial';
import { ApiVolume } from 'types/Volume';

export const defaultValues: FormPartial<ApiVolume, 'notebooks_ids' | 'is_event'> = {
  title: '',
  subtitle: '',
  image_url: '',
  date: '',
  serie_id: '',
  order: '',
  global_order: '',
  notebooks_ids: [],
};

export const numberFields: (keyof ApiVolume)[] = ['order', 'serie_id', 'global_order'];
