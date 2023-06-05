import { IoSave } from 'react-icons/io5';

import Button from '@components/Button';

import messages from './SaveButton.messages';

const SaveButton = (): JSX.Element => (
  <Button type="submit" icon={<IoSave />}>
    {messages.save}
  </Button>
);

export default SaveButton;
