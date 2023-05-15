'use client';

import routes from 'config/routes';

import { ApiWave } from 'types/Wave';

import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';

import wavesMessages from './Waves.messages';

type Props = {
  initialValues: FormPartial<ApiWave>;
  variant: FormVariant;
  databaseName: string;
  id?: number;
};

const WavesForm = ({ variant, initialValues, databaseName, id }: Props): JSX.Element => (
  <FormContainer
    variant={variant}
    initialValues={initialValues}
    databaseName={`db/${databaseName}/waves`}
    messages={wavesMessages}
    numberFields={['order']}
    id={id}
    showPathname={routes.waves.id.show.href}
    query={{ databaseName, id }}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder={wavesMessages.name} required />
        <Input name="order" placeholder={wavesMessages.order} />
        <FormActions backHref={{ pathname: routes.db.id.show.href, query: { databaseName } }} />
      </form>
    )}
  </FormContainer>
);

export default WavesForm;
