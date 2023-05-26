import routes from 'config/routes';
import FormContainer from '@components/FormContainer';

import wavesMessages from '../Waves.messages';
import { Props } from './WavesForm.types';
import WavesForm from './WavesForm';

const WavesFormContainer = ({ variant, initialValues, databaseName, id }: Props): JSX.Element => (
  <FormContainer
    variant={variant}
    messages={wavesMessages}
    id={id}
    showPathname={routes.waves.id.show.href}
    query={{ databaseName, id }}
  >
    <WavesForm variant={variant} initialValues={initialValues} databaseName={databaseName} id={id} />
  </FormContainer>
);

export default WavesFormContainer;
