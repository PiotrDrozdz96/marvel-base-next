'use client';

import routes from 'config/routes';

import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import { Form } from '@lib/react-final-form';
import postDatabase from '@api/post/postDatabase';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import useSubmit from 'hooks/useSubmit';

import databaseMessages from './Database.messages';

type Props = {
  initialValues: FormPartial<{ name: string }>;
  variant: FormVariant;
};

const DatabaseForm = ({ variant, initialValues }: Props): JSX.Element => {
  const onSubmit = useSubmit<FormPartial<{ name: string }>>(initialValues.name, postDatabase);

  return (
    <FormContainer
      variant={variant}
      messages={databaseMessages}
      id={initialValues.name}
      showPathname={routes.db.id.show.href}
      query={{ databaseName: initialValues.name }}
    >
      <Form initialValues={initialValues} messages={databaseMessages} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input name="name" placeholder={databaseMessages.name} required />
            <FormActions backHref={{ pathname: routes.settings.href }} />
          </form>
        )}
      </Form>
    </FormContainer>
  );
};

export default DatabaseForm;
