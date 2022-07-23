import FormPartial from 'types/FormPartial';
import { ApiVolume } from 'types/Volume';

export const defaultValues: FormPartial<ApiVolume, 'notebooks' | 'is_event'> = {
  title: '',
  subtitle: '',
  image_url: '',
  date: '',
  serie_id: '',
  order: '',
  global_order: '',
  notebooks: [],
  event_id: '',
};

export const numberFields: (keyof ApiVolume)[] = ['order', 'serie_id', 'event_id', 'global_order'];
export const nullableFields: (keyof ApiVolume)[] = ['is_event', 'event_id'];
