import { ReactNode } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

import FormVariant from 'types/FormVariant';
import Container from '@components/Container';
import Paper from '@components/Paper';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';
import { interpolate } from 'utils/interpolate';
import convertValuesTo from 'utils/convertValuesTo';

type Props<FormValues> = {
  variant: FormVariant;
  initialValues: FormValues;
  databaseName: string;
  messages: {
    createName: string;
    editName: string;
  };
  id?: string | number;
  query?: UrlObject['query'];
  numberFields?: (keyof FormValues)[];
  showPathname?: string;
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
  query,
  numberFields,
}: Props<FormValues>): JSX.Element => {
  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    const numberValues = convertValuesTo(Number, values, numberFields);

    await fetch(variant === 'create' ? `/api/${databaseName}` : `/api/${databaseName}/${id}`, {
      method: 'POST',
      body: JSON.stringify({ ...values, ...numberValues }),
    });
    router.back();
  };

  return (
    <Container>
      <Toolbar name={variant === 'create' ? messages.createName : interpolate(messages.editName, { id })}>
        {variant === 'edit' && !!showPathname && (
          <ActionButton variant="show" href={{ pathname: showPathname, query: query || { id } }} />
        )}
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
