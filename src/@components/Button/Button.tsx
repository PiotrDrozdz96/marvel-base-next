import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import Link, { LinkProps } from '@components/Link';

import classes from './Button.module.scss';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type Props = {
  type: Exclude<ButtonProps['type'], undefined> | 'link';
  href?: LinkProps['href'];
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
};

const Button = ({ type, href, icon, children, onClick }: Props): JSX.Element => {
  const content = (
    <>
      {icon}
      <div className={classes.text}>{children}</div>
    </>
  );

  return type === 'link' ? (
    <Link className={classes.button} href={href}>
      {content}
    </Link>
  ) : (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={classes.button} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
