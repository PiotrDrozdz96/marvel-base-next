import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ParsedUrlQueryInput } from 'querystring';
import { IoCloudDownload, IoAlertCircleOutline } from 'react-icons/io5';

import { Form } from '@lib/react-final-form';
import Modal from '@components/Modal';
import Button from '@components/Button';
import Input from '@components/Input';
import classes from '@components/ActionButton/ActionButton.module.scss';
import stringifyHref from 'utils/stringifyHref';

import messages from './ImportButton.messages';

type Props = {
  url: {
    pathname: string;
    query: ParsedUrlQueryInput;
  };
  type?: 'push' | 'replace';
  withRange?: boolean;
};

const ImportButton = ({ url, type = 'push', withRange = false }: Props): JSX.Element => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" icon={<IoCloudDownload />} onClick={() => setIsOpen(true)}>
        {messages.button}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.modalHeader}>{messages.header}</div>
        <Form
          onSubmit={(values) => {
            setIsOpen(false);
            const finalUrl = stringifyHref({ pathname: url.pathname, query: { ...url.query, ...values } });
            if (type === 'push') {
              router.push(finalUrl);
            } else {
              router.replace(finalUrl);
            }
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.modalContent}>
                <Input name="url" placeholder={messages.url} required />
                {withRange && (
                  <>
                    <Input name="from" placeholder={messages.from} />
                    <Input name="to" placeholder={messages.to} />
                  </>
                )}
              </div>
              <div className={classes.modalActions}>
                <Button
                  className={classes.button}
                  type="button"
                  variant="secondary"
                  icon={<IoAlertCircleOutline />}
                  onClick={() => setIsOpen(false)}
                >
                  {messages.cancel}
                </Button>
                <Button type="submit" icon={<IoCloudDownload />}>
                  {messages.button}
                </Button>
              </div>
            </form>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ImportButton;
