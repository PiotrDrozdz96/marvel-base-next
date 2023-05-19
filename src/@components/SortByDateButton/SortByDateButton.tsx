import { IoCalendar } from 'react-icons/io5';

import Button from '@components/Button';

import { sortByDate } from './SortByDateButton.actions';
import messages from './SortByDateButton.messages';

const SortByDateButton = () => (
  <form action={sortByDate}>
    <Button type="submit" icon={<IoCalendar />}>
      {messages.sortByDate}
    </Button>
  </form>
);

export default SortByDateButton;
