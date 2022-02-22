import { Form } from 'react-final-form';

import FormPartial from 'types/FormPartial';
import Paper from '@components/Paper';
import Input from '@components/Input';
import FormActions from '@components/FormActions';

import databaseMessages from '../Database.messages';

type FormValues = FormPartial<{
  name: string;
}>;

type Props = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
};

const DatabaseForm = ({ initialValues, onSubmit }: Props): JSX.Element => (
  <Paper>
    <Form<FormValues> initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder={databaseMessages.name} required />
          <FormActions />
        </form>
      )}
    </Form>
  </Paper>
);

export default DatabaseForm;
