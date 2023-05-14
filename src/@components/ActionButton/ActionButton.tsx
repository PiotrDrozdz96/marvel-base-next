'use client';

import { ReactNode, useState } from 'react';
import { IoAdd, IoPencil, IoTrash, IoEye, IoCalendar, IoAlertCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/Button';
import Modal from '@components/Modal';
import { interpolate } from 'utils/interpolate';

import messages from './ActionButton.messages';
import classes from './ActionButton.module.scss';

type Variant = 'add' | 'edit' | 'delete' | 'show' | 'sortByDate';

export type Props = {
  variant: Variant;
  href?: ButtonProps['href'];
  itemName?: string;
  onDelete?: () => void;
  onClick?: () => void;
};

const iconMap: Record<Variant, ReactNode> = {
  add: <IoAdd />,
  edit: <IoPencil />,
  delete: <IoTrash />,
  show: <IoEye />,
  sortByDate: <IoCalendar />,
};

const ActionButton = ({ variant, itemName, href, onDelete, onClick }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const isDeleteVariant = variant === 'delete';

  return (
    <>
      <Button
        type={['delete', 'sortByDate'].includes(variant) ? 'button' : 'link'}
        href={href}
        icon={iconMap[variant]}
        onClick={isDeleteVariant ? () => setIsOpen(true) : onClick}
      >
        {messages[variant]}
      </Button>
      {isDeleteVariant && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className={classes.modalHeader}>{interpolate(messages.deleteHeader, { itemName })}</div>
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
                onDelete?.();
                setIsOpen(false);
              }}
            >
              {messages.confirm}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ActionButton;
