import { ReactNode } from 'react';

import Container from '@components/Container';
import Toolbar from '@components/Toolbar';
import ActionButton, { ActionButtonProps } from '@components/ActionButton';

type Props = {
  name: string;
  filters?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  bottomActions?: ReactNode;
  addHref?: ActionButtonProps['href'];
};

const ListWrapper = ({ name, filters, children, actions, bottomActions, addHref }: Props) => (
  <Container>
    <Toolbar name={name} filters={filters}>
      {!!addHref && <ActionButton variant="add" href={addHref} />}
      {actions}
    </Toolbar>
    {children}
    {bottomActions}
  </Container>
);

export default ListWrapper;
