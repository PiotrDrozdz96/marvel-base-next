import { ReactNode } from 'react';
import { IoAdd, IoPencil, IoTrash, IoEye } from 'react-icons/io5';

import Link, { LinkProps } from '@components/Link';

import messages from './ActionButton.messages';
import classes from './ActionButton.module.scss';

type Variant = 'add' | 'edit' | 'delete' | 'show';

type Props = {
  variant: Variant;
  href?: LinkProps['href'];
};

const iconMap: Record<Variant, ReactNode> = {
  add: <IoAdd />,
  edit: <IoPencil />,
  delete: <IoTrash />,
  show: <IoEye />,
};

const ActionButton = ({ variant, href }: Props): JSX.Element => {
  const content = (
    <>
      {iconMap[variant]}
      <div className={classes.text}>{messages[variant]}</div>
    </>
  );

  return href ? (
    <Link className={classes.button} href={href}>
      {content}
    </Link>
  ) : (
    <div className={classes.button}>{content}</div>
  );
};

export default ActionButton;
