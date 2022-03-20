import { CSSProperties, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';

// import { NOSCRIPT_CLASSES } from 'core/noscript.styles';
import useElementHeight from 'hooks/useElementHeight';

import classes from './Collapsible.module.scss';

type TwoStateTrigger = { opened: string | ReactNode; closed: string | ReactNode };

type Props = {
  initiallyOpen?: boolean;
  className?: string;
  children: ReactNode;
  trigger: TwoStateTrigger;
};

const Collapsible = ({ className, children, initiallyOpen = false, trigger }: Props): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const collapseHeight = useElementHeight(contentRef);

  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    <div className={classes.wrapper} style={{ '--height': isOpen ? `${collapseHeight}px` : 0 } as CSSProperties}>
      <div className={classNames(classes.contentWrapper)}>
        <div ref={contentRef}>{children}</div>
      </div>
      <span className={className} onClick={toggle}>
        {isOpen ? trigger.opened : trigger.closed}
      </span>
    </div>
  );
};

export default Collapsible;
