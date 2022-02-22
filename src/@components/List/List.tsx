import { ReactNode } from 'react';

import Container from '@components/Container';
import Toolbar from '@components/Toolbar';
import ActionButton, { ActionButtonProps } from '@components/ActionButton';

import classes from './List.module.scss';

type Props = {
  name: string;
  labels: string[];
  children: ReactNode;
  addHref: ActionButtonProps['href'];
  addHrefAs?: ActionButtonProps['as'];
};

const List = ({ name, addHref, addHrefAs, labels, children }: Props) => (
  <Container>
    <Toolbar name={name}>
      <ActionButton variant="add" href={addHref} as={addHrefAs} />
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
  </Container>
);

export default List;
