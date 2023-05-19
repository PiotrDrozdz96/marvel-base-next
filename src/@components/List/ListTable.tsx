import { ReactNode } from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';

import classes from './ListTable.module.scss';

type Props = Partial<DroppableProvided> & {
  labels: string[];
  children: ReactNode;
};

const ListTable = ({ labels, children, droppableProps, innerRef, placeholder }: Props) => (
  <table {...droppableProps} ref={innerRef} className={classes.table}>
    <thead>
      <tr>
        {labels.map((label) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
    {!!placeholder && <tbody>{placeholder}</tbody>}
  </table>
);

export default ListTable;
