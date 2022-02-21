import { ReactNode } from 'react';

import classes from './List.module.scss';

type Props = {
  labels: string[];
  children: ReactNode;
};

const List = ({ labels, children }: Props) => (
  <table className={classes.table}>
    <thead>
      <tr>
        {labels.map((label) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default List;
