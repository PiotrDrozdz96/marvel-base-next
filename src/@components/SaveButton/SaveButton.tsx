import { IoSave } from 'react-icons/io5';

import Button from '@components/Button';

import messages from './SaveButton.messages';

type Props = {
  onSave?: () => void;
};

const SaveButton = ({ onSave }: Props): JSX.Element => (
  <Button type={onSave ? 'button' : 'submit'} icon={<IoSave />} onClick={onSave}>
    {messages.save}
  </Button>
);

export default SaveButton;
