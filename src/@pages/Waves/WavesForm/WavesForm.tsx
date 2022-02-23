import routes from 'config/routes';

import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';

import wavesMessages from '../Waves.messages';

type Props = {
  initialValues: FormPartial<{ name: string; order: number }>;
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
    id={id}
    showPathname={routes.waves.id.show.href}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder={wavesMessages.name} required />
        <Input name="order" placeholder={wavesMessages.order} required />
        <FormActions />
      </form>
    )}
  </FormContainer>
);

export default WavesForm;
