'use client';

import { useState } from 'react';
import { IoTrash, IoAlertCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';

import Resource from 'types/Resource';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { interpolate } from 'utils/interpolate';

import { onDelete } from './DeleteButton.actions';
import messages from './DeleteButton.messages';
import classes from './DeleteButton.module.scss';

type Props = {
  resource: Resource;
  databaseName?: string;
  id?: string | number;
};

const DeleteButton = ({ resource, databaseName, id }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" icon={<IoTrash />} onClick={() => setIsOpen(true)}>
        {messages.delete}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.modalHeader}>{interpolate(messages.deleteHeader, { itemName: `#${id}` })}</div>
        <div className={classes.modalContent}>{messages.deleteModalContent}</div>
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
          <Button
            type="button"
            icon={<IoCheckmarkCircle />}
            onClick={() => {
              onDelete(resource, databaseName, id);
            }}
          >
            {messages.confirm}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
