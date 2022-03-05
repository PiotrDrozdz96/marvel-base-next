import FormPartial from 'types/FormPartial';
import { ApiVolume } from 'types/Volume';

export const defaultValues: FormPartial<ApiVolume> = {
  title: '',
  subtitle: '',
  image_url: '',
  date: '',
  serie_id: '',
  order: '',
  global_order: '',
};