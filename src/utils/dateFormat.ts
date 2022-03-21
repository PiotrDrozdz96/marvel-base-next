import { format, isValid } from 'date-fns';
import pl from 'date-fns/locale/pl';

const dateFormat = (date: string): string => {
  const newDate = new Date(date);
  return isValid(newDate)
    ? format(new Date(date), 'd LLLL yyyy', {
        locale: pl,
      })
    : newDate.toString();
};

export default dateFormat;
