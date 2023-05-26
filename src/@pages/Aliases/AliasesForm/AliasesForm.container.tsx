import FormContainer from '@components/FormContainer';

import aliasesMessages from '../Aliases.messages';
import { Props } from './AliasesForm.types';
import AliasesForm from './AliasesForm';

const AliasesFormContainer = ({ initialValues, databaseName }: Props): JSX.Element => (
  <FormContainer variant="create" messages={aliasesMessages}>
    <AliasesForm initialValues={initialValues} databaseName={databaseName} />
  </FormContainer>
);

export default AliasesFormContainer;
