import { ReactNode, useState } from 'react';
import { IoAdd, IoPencil, IoTrash, IoEye, IoAlertCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/Button';
import Modal from '@components/Modal';
import { interpolate } from 'utils/interpolate';

import messages from './ActionButton.messages';
import classes from './ActionButton.module.scss';

type Variant = 'add' | 'edit' | 'delete' | 'show';

export type Props = {
  variant: Variant;
  href?: ButtonProps['href'];
  as?: ButtonProps['as'];
  itemName?: string;
  onDelete?: () => void;
};

const iconMap: Record<Variant, ReactNode> = {
  add: <IoAdd />,
  edit: <IoPencil />,
  delete: <IoTrash />,
  show: <IoEye />,
};

const ActionButton = ({ variant, itemName, href, as, onDelete }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const isDeleteVariant = variant === 'delete';

  return (
    <>
      <Button
        type={isDeleteVariant ? 'button' : 'link'}
        href={href}
        as={as}
        icon={iconMap[variant]}
        onClick={isDeleteVariant ? () => setIsOpen(true) : undefined}
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
