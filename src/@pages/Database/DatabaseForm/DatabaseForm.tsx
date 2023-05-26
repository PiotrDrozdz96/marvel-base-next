'use client';

import routes from 'config/routes';

import FormPartial from 'types/FormPartial';
import { Form } from '@lib/react-final-form';
import postDatabase from '@api/post/postDatabase';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import useSubmit from 'hooks/useSubmit';

import databaseMessages from '../Database.messages';
import { Props } from './DatabaseForm.types';

const DatabaseForm = ({ initialValues }: Omit<Props, 'variant'>): JSX.Element => {
  const onSubmit = useSubmit<FormPartial<{ name: string }>>(initialValues.name, postDatabase);

  return (
    <Form initialValues={initialValues} messages={databaseMessages} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder={databaseMessages.name} required />
          <FormActions backHref={{ pathname: routes.settings.href }} />
        </form>
      )}
    </Form>
  );
};

export default DatabaseForm;
