import { useRouter } from 'next/router';
import { IoArrowBack } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/Button';

import messages from './BackButton.messages';

export type Props = {
  href: ButtonProps['href'];
};

const BackButton = ({ href }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <Button
      type="link"
      href={href}
      icon={<IoArrowBack />}
      onClick={() => {
        router.back();
      }}
    >
      {messages.back}
    </Button>
  );
};

export default BackButton;
