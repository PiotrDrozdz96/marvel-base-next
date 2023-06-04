import routes from 'config/routes';
import FormContainer from '@components/FormContainer';

import wavesMessages from '../Waves.messages';
import { Props } from './WavesForm.types';
import WavesForm from './WavesForm';

const WavesFormContainer = ({ initialValues, databaseName, id }: Props): JSX.Element => (
  <FormContainer messages={wavesMessages} id={id} showPathname={routes.waves.id.show.href} query={{ databaseName, id }}>
    <WavesForm initialValues={initialValues} databaseName={databaseName} id={id} />
  </FormContainer>
);

export default WavesFormContainer;
