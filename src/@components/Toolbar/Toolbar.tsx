import { ReactNode } from 'react';
import classes from './Toolbar.module.scss';

type Props = {
  name: string;
  children?: ReactNode;
  filters?: ReactNode;
};

const Toolbar = ({ name, filters, children }: Props): JSX.Element => (
  <div className={classes.toolbar}>
    <div className={classes.left}>
      <div className={classes.name}>{name}</div>
      {filters}
    </div>
    <div className={classes.actions}>{children}</div>
  </div>
);

export default Toolbar;
