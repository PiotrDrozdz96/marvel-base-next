import routes from 'config/routes';
import FormContainer from '@components/FormContainer';

import databaseMessages from '../Database.messages';
import { Props } from './DatabaseForm.types';
import DatabaseForm from './DatabaseForm';

const DatabaseFormContainer = ({ variant, initialValues }: Props): JSX.Element => (
  <FormContainer
    variant={variant}
    messages={databaseMessages}
    id={initialValues.name}
    showPathname={routes.db.id.show.href}
    query={{ databaseName: initialValues.name }}
  >
    <DatabaseForm initialValues={initialValues} />
  </FormContainer>
);

export default DatabaseFormContainer;
