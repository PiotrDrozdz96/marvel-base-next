import { ReactNode } from 'react';

import Link, { LinkProps } from '@components/Link';

import classes from './TextField.module.scss';

type Props = {
  label: string;
  value: ReactNode;
  href?: LinkProps['href'];
};

const TextField = ({ label, value, href }: Props): JSX.Element =>
  value ? (
    <div className={classes.textField}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>
        {!href ? (
          value
        ) : (
          <Link className={classes.link} href={href}>
            {value}
          </Link>
        )}
      </div>
    </div>
  ) : (
    <></>
  );

export default TextField;
