import { ReactNode } from 'react';

import Container from '@components/Container';
import Toolbar from '@components/Toolbar';
import ActionButton, { ActionButtonProps } from '@components/ActionButton';

import classes from './List.module.scss';

type Props = {
  name: string;
  filters?: ReactNode;
  labels: string[];
  children: ReactNode;
  actions?: ReactNode;
  bottomActions?: ReactNode;
  addHref?: ActionButtonProps['href'];
};

const List = ({ name, filters, addHref, labels, children, actions, bottomActions }: Props) => (
  <Container>
    <Toolbar name={name} filters={filters}>
      {!!addHref && <ActionButton variant="add" href={addHref} />}
      {actions}
    </Toolbar>
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
    {bottomActions}
  </Container>
);

export default List;
