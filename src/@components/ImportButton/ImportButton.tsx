import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'react-final-form';
import { IoCloudDownload, IoAlertCircleOutline } from 'react-icons/io5';

import routes from 'config/routes';
import Modal from '@components/Modal';
import Button from '@components/Button';
import Input from '@components/Input';
import classes from '@components/ActionButton/ActionButton.module.scss';

import messages from './ImportButton.messages';

type Props = {
  databaseName: string;
  id: number;
};

const ImportButton = ({ databaseName, id }: Props): JSX.Element => {
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
          onSubmit={(values) =>
            router.push({ pathname: routes.series.id.import.href, query: { databaseName, id, ...values } })
          }
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.modalContent}>
                <Input name="url" placeholder={messages.url} required />
                <Input name="from" placeholder={messages.from} />
                <Input name="to" placeholder={messages.to} />
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
