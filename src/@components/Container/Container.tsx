import { ReactNode } from 'react';
import classNames from 'classnames';

import classes from './Container.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => (
  <div className={classNames(classes.container, className)}>{children}</div>
);

export default Container;
