import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import classNames from 'classnames';

import Link, { LinkProps } from '@components/Link';

import classes from './Button.module.scss';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type Props = {
  type: Exclude<ButtonProps['type'], undefined> | 'link';
  href?: LinkProps['href'];
  as?: LinkProps['as'];
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

const Button = ({ type, href, icon, as, children, className, variant = 'primary', onClick }: Props): JSX.Element => {
  const content = (
    <>
      {icon}
      <div className={classes.text}>{children}</div>
    </>
  );

  const finalClassName = classNames(classes.button, className, { [classes.secondary]: variant === 'secondary' });

  return type === 'link' ? (
    <Link className={finalClassName} href={href} as={as}>
      {content}
    </Link>
  ) : (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={finalClassName} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
