import { Form } from 'react-final-form';

import { ApiMenuItem } from 'types/Menu';
import Input from '@components/Input';
import Select from '@components/Select';
import Container from '@components/Container';
import Paper from '@components/Paper';
import FormActions from '@components/FormActions';

import menuMessages from '../Menu.messages';

type FormValues = Omit<ApiMenuItem, 'order'>;

const MenuForm = (): JSX.Element => (
  <Container>
    <Paper>
      <Form<FormValues> onSubmit={() => {}}>
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Input name="name" placeholder={menuMessages.name} />
            <Select
              name="type"
              placeholder={menuMessages.type}
              options={[
                { value: 'SUB_MENU', label: 'SUB_MENU' },
                { value: 'MAIN_MENU', label: 'MAIN_MENU' },
              ]}
            />
            <Input name="url" placeholder={menuMessages.url} />
            {values.type === 'MAIN_MENU' && <Input name="icon" placeholder={menuMessages.icon} />}
            {values.type === 'SUB_MENU' && <Input name="parent_id" placeholder={menuMessages.parent_id} />}
            <FormActions />
          </form>
        )}
      </Form>
    </Paper>
  </Container>
);

export default MenuForm;
