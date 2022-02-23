import routes from 'config/routes';

import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';

import databaseMessages from '../Database.messages';

type Props = {
  initialValues: { name: string };
  variant: 'create' | 'edit';
};

const DatabaseFormContainer = ({ variant, initialValues }: Props): JSX.Element => (
  <FormContainer
    variant={variant}
    initialValues={initialValues}
    databaseName="db"
    messages={databaseMessages}
    id={initialValues.name}
    showPathname={routes.db.id.show.href}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder={databaseMessages.name} required />
        <FormActions />
      </form>
    )}
  </FormContainer>
);

export default DatabaseFormContainer;
