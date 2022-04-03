import { ReactNode } from 'react';

import classes from './TextField.module.scss';

type Props = {
  label: string;
  value: ReactNode;
};

const TextField = ({ label, value }: Props): JSX.Element =>
  value ? (
    <div className={classes.textField}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  ) : (
    <></>
  );

export default TextField;
