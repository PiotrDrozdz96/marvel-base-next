import FormPartial from 'types/FormPartial';
import { ApiNotebook } from 'types/Notebook';

export const defaultValues: FormPartial<ApiNotebook> = {
  title: '',
  vol: '',
  no: '',
  subtitle: '',
  image_url: '',
  date: '',
  serie_id: '',
  order: '',
};

export const numberFields: (keyof ApiNotebook)[] = ['vol', 'no', 'order', 'serie_id'];
