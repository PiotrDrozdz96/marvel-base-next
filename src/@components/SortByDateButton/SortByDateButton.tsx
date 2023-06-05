import { IoCalendar } from 'react-icons/io5';

import reorderVolumesByDate from '@api/reorderVolumesByDate';
import Button from '@components/Button';

import messages from './SortByDateButton.messages';

const SortByDateButton = () => (
  <form action={reorderVolumesByDate}>
    <Button type="submit" icon={<IoCalendar />}>
      {messages.sortByDate}
    </Button>
  </form>
);

export default SortByDateButton;
