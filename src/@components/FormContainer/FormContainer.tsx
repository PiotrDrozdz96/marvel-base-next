import { ReactNode } from 'react';
import { UrlObject } from 'url';

import Container from '@components/Container';
import Paper from '@components/Paper';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';
import { interpolate } from 'utils/interpolate';

type Props = {
  messages: {
    createName: string;
    editName: string;
  };
  id?: string | number;
  actions?: ReactNode;
  query?: UrlObject['query'];
  showPathname?: string;
  children: ReactNode;
};

const FormContainer = ({ messages, id, actions, showPathname, children, query }: Props): JSX.Element => (
  <Container>
    <Toolbar name={!id ? messages.createName : interpolate(messages.editName, { id })}>
      {id && !!showPathname && (
        <ActionButton variant="show" href={{ pathname: showPathname, query: query || { id } }} />
      )}
      {actions}
    </Toolbar>
    <Paper>{children}</Paper>
  </Container>
);

export default FormContainer;
