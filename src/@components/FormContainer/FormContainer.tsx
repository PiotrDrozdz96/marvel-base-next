import { ReactNode } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useRouter } from 'next/router';

import FormVariant from 'types/FormVariant';
import Container from '@components/Container';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';
import { interpolate } from 'utils/interpolate';
import Paper from '@components/Paper';

type Props<FormValues> = {
  variant: FormVariant;
  initialValues: FormValues;
  databaseName: string;
  messages: {
    createName: string;
    editName: string;
  };
  id?: string | number;
  showPathname: string;
  children: ((props: FormRenderProps<FormValues, Partial<FormValues>>) => ReactNode) | ReactNode;
};

const FormContainer = <FormValues,>({
  variant,
  initialValues,
  databaseName,
  messages,
  id,
  showPathname,
  children,
}: Props<FormValues>): JSX.Element => {
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    await fetch(variant === 'create' ? `/api/add/${databaseName}` : `/api/edit/${databaseName}/${id}`, {
      method: 'POST',
      body: JSON.stringify(values),
    });
    router.back();
  };

  return (
    <Container>
      <Toolbar name={variant === 'create' ? messages.createName : interpolate(messages.editName, { id })}>
        {variant === 'edit' && <ActionButton variant="show" href={{ pathname: showPathname, query: { id } }} />}
      </Toolbar>
      <Paper>
        <Form<FormValues> initialValues={initialValues} onSubmit={onSubmit}>
          {children}
        </Form>
      </Paper>
    </Container>
  );
};

export default FormContainer;
