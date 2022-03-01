import { format } from 'date-fns';
import pl from 'date-fns/locale/pl';

const dateFormat = (date: string): string =>
  format(new Date(date), 'd LLLL yyyy', {
    locale: pl,
  });

export default dateFormat;
