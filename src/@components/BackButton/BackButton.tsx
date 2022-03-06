import { IoArrowBack } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/Button';

import messages from './BackButton.messages';

export type Props = {
  href: ButtonProps['href'];
};

const BackButton = ({ href }: Props): JSX.Element => (
  <Button type="link" href={href} icon={<IoArrowBack />}>
    {messages.back}
  </Button>
);

export default BackButton;
