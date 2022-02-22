import { ReactNode } from 'react';

import Container from '@components/Container';
import Paper from '@components/Paper';
import Toolbar from '@components/Toolbar';
import ActionButton, { ActionButtonProps } from '@components/ActionButton';
import FormActions from '@components/FormActions';

type Props = {
  name: string;
  editHref: ActionButtonProps['href'];
  children: ReactNode;
};

const Show = ({ name, editHref, children }: Props): JSX.Element => (
  <Container>
    <Toolbar name={name}>
      <ActionButton variant="edit" href={editHref} />
    </Toolbar>
    <Paper>
      {children}
      <FormActions withoutSave />
    </Paper>
  </Container>
);

export default Show;
