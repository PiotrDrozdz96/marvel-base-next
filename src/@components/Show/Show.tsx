import { ReactNode } from 'react';

import Container from '@components/Container';
import Paper from '@components/Paper';
import Toolbar from '@components/Toolbar';
import ActionButton, { ActionButtonProps } from '@components/ActionButton';
import FormActions, { FormActionsProps } from '@components/FormActions';

export type Props = {
  name: string;
  editHref?: ActionButtonProps['href'];
  backHref?: FormActionsProps['backHref'];
  children: ReactNode;
};

const Show = ({ name, editHref, backHref, children }: Props): JSX.Element => (
  <Container>
    <Toolbar name={name}>{!!editHref && <ActionButton variant="edit" href={editHref} />}</Toolbar>
    <Paper>
      {children}
      <FormActions backHref={backHref} withoutSave />
    </Paper>
  </Container>
);

export default Show;
