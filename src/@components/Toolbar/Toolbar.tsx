import { ReactNode } from 'react';
import classes from './Toolbar.module.scss';

type Props = {
  name: string;
  children?: ReactNode;
};

const Toolbar = ({ name, children }: Props): JSX.Element => (
  <div className={classes.toolbar}>
    <div className={classes.name}>{name}</div>
    <div className={classes.actions}>{children}</div>
  </div>
);

export default Toolbar;
