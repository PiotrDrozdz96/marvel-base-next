import { Form } from 'react-final-form';

import { ApiMenuItem } from 'types/Menu';
import SelectOption from 'types/SelectOption';
import Input from '@components/Input';
import Select from '@components/Select';
import Container from '@components/Container';
import Paper from '@components/Paper';
import FormActions from '@components/FormActions';

import menuMessages from '../Menu.messages';

type FormValues = ApiMenuItem;

const typeOptions: SelectOption[] = [
  { value: 'SUB_MENU', label: 'SUB_MENU' },
  { value: 'MAIN_MENU', label: 'MAIN_MENU' },
];

const iconOptions: SelectOption[] = [
  { value: 'home', label: 'Home' },
  { value: 'tv', label: 'Tv' },
  { value: 'reader', label: 'Reader' },
];

type Props = {
  menuOptions: SelectOption[];
  onSubmit: (values: FormValues) => void;
};

const MenuForm = ({ menuOptions, onSubmit }: Props): JSX.Element => (
  <Container>
    <Paper>
      <Form<FormValues> onSubmit={onSubmit}>
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Input name="name" placeholder={menuMessages.name} required />
            <Select name="type" placeholder={menuMessages.type} options={typeOptions} required />
            <Input name="url" placeholder={menuMessages.url} required={values.type === 'SUB_MENU'} />
            {values.type === 'MAIN_MENU' && (
              <Select name="icon" placeholder={menuMessages.icon} options={iconOptions} required />
            )}
            {values.type === 'SUB_MENU' && (
              <Select name="parent_id" placeholder={menuMessages.parent_id} options={menuOptions} required />
            )}
            <Input name="order" placeholder={menuMessages.order} required />
            <FormActions />
          </form>
        )}
      </Form>
    </Paper>
  </Container>
);

export default MenuForm;
