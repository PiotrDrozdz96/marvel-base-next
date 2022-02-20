import { Form } from 'react-final-form';

import Input from '@components/Input';
import Container from '@components/Container';
import Paper from '@components/Paper';
import FormActions from '@components/FormActions';

import menuMessages from '../Menu.messages';

const MenuForm = (): JSX.Element => (
  <Container>
    <Paper>
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input name="name" placeholder={menuMessages.name} />
            <Input name="type" placeholder={menuMessages.type} />
            <Input name="url" placeholder={menuMessages.url} />
            <Input name="icon" placeholder={menuMessages.icon} />
            <Input name="parent_id" placeholder={menuMessages.parent_id} />
            <FormActions />
          </form>
        )}
      </Form>
    </Paper>
  </Container>
);

export default MenuForm;
