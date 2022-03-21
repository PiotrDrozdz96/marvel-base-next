import { toDate } from 'date-fns';

const parseDate = (date: string): Date => toDate(Date.parse(date));

export default parseDate;
