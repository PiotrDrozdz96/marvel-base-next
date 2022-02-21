import { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import classes from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ isOpen, children, onClose }: Props): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let blockBodyScroll = false;
    if (isOpen && document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
      blockBodyScroll = true;
    }

    return () => {
      if (blockBodyScroll) {
        document.body.style.overflow = 'visible';
      }
    };
  }, [isOpen]);

  const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== wrapperRef.current) {
      return;
    }
    onClose();
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <div className={classes.wrapper} ref={wrapperRef} onClick={handleOutsideClick}>
            <div className={classes.box}>{children}</div>
          </div>,
          document.querySelector('body') as Element
        )}
    </>
  );
};

export default Modal;
