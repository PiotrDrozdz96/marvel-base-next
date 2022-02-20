import { ReactNode } from 'react';

import classes from './List.module.scss';

type Props = {
  labels: string[];
  children: ReactNode;
};

const List = ({ labels, children }: Props) => (
  <table className={classes.table}>
    <tr>
      {labels.map((label) => (
        <th key={label}>{label}</th>
      ))}
    </tr>
    {children}
  </table>
);

export default List;
