import { ReactNode } from 'react';
import classNames from 'classnames';

import classes from './Paper.module.scss';

type Props = {
  variant?: 'tertiary' | 'secondary';
  children: ReactNode;
};

const Paper = ({ variant = 'secondary', children }: Props) => (
  <div
    className={classNames(classes.paper, {
      [classes.tertiary]: variant === 'tertiary',
      [classes.secondary]: variant === 'secondary',
    })}
  >
    {children}
  </div>
);

export default Paper;
