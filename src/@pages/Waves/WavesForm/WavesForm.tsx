'use client';

import routes from 'config/routes';

import { ApiWave } from 'types/Wave';
import FormPartial from 'types/FormPartial';
import { Form } from '@lib/react-final-form';
import postWaves from '@api/post/postWaves';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import useSubmit from 'hooks/useSubmit';

import wavesMessages from '../Waves.messages';
import { Props } from './WavesForm.types';

const WavesForm = ({ variant, initialValues, databaseName, id }: Props): JSX.Element => {
  const onSubmit = useSubmit<FormPartial<ApiWave>>(
    databaseName,
    postWaves,
    { numberFields: ['order'] },
    variant === 'create' ? undefined : id
  );

  return (
    <Form<FormPartial<ApiWave>> initialValues={initialValues} messages={wavesMessages} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder={wavesMessages.name} required />
          <Input name="order" placeholder={wavesMessages.order} />
          <FormActions backHref={{ pathname: routes.db.id.show.href, query: { databaseName } }} />
        </form>
      )}
    </Form>
  );
};

export default WavesForm;
