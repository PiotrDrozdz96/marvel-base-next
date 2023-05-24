'use client';

import routes from 'config/routes';

import { Alias } from 'types/Alias';
import FormPartial from 'types/FormPartial';
import { Form } from '@lib/react-final-form';
import postAlias from '@api/post/postAlias';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import useSubmit from 'hooks/useSubmit';

import aliasesMessages from './Aliases.messages';

type Props = {
  initialValues: FormPartial<Alias>;
  databaseName: string;
};

const AliasesForm = ({ initialValues, databaseName }: Props): JSX.Element => {
  const onSubmit = useSubmit<FormPartial<Alias>>(databaseName, postAlias);

  return (
    <FormContainer variant="create" messages={aliasesMessages}>
      <Form initialValues={initialValues} messages={aliasesMessages} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input name="name" placeholder={aliasesMessages.name} required />
            <Input name="params" placeholder={aliasesMessages.params} required />
            <FormActions backHref={{ pathname: routes.db.id.show.href, query: { databaseName } }} />
          </form>
        )}
      </Form>
    </FormContainer>
  );
};

export default AliasesForm;
