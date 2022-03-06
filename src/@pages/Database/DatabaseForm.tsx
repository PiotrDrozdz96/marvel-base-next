import routes from 'config/routes';

import FormVariant from 'types/FormVariant';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';

import databaseMessages from './Database.messages';

type Props = {
  initialValues: { name: string };
  variant: FormVariant;
};

const DatabaseForm = ({ variant, initialValues }: Props): JSX.Element => (
  <FormContainer
    variant={variant}
    initialValues={initialValues}
    databaseName="db"
    messages={databaseMessages}
    id={initialValues.name}
    showPathname={routes.db.id.show.href}
    query={{ databaseName: initialValues.name }}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder={databaseMessages.name} required />
        <FormActions backHref={{ pathname: routes.settings.href }} />
      </form>
    )}
  </FormContainer>
);

export default DatabaseForm;
