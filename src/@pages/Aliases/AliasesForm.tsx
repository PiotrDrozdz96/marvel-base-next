import routes from 'config/routes';

import { Alias } from 'types/Alias';
import FormPartial from 'types/FormPartial';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';

import aliasesMessages from './Aliases.messages';

type Props = {
  initialValues: FormPartial<Alias>;
  databaseName: string;
};

const AliasesForm = ({ initialValues, databaseName }: Props): JSX.Element => (
  <FormContainer
    variant="create"
    initialValues={initialValues}
    databaseName={`db/${databaseName}/aliases`}
    messages={aliasesMessages}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder={aliasesMessages.name} required />
        <Input name="params" placeholder={aliasesMessages.params} required />
        <FormActions backHref={{ pathname: routes.db.id.show.href, query: { databaseName } }} />
      </form>
    )}
  </FormContainer>
);

export default AliasesForm;
