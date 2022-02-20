import { useRouter } from 'next/router';
import { IoArrowBack } from 'react-icons/io5';

import Button from '@components/Button';

import messages from './BackButton.messages';

const BackButton = (): JSX.Element => {
  const router = useRouter();

  return (
    <Button type="button" icon={<IoArrowBack />} onClick={() => router.back()}>
      {messages.back}
    </Button>
  );
};

export default BackButton;
