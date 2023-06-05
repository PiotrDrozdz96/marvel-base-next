import routes from 'config/routes';
import NotebooksProvider from '@pages/Notebooks/NotebooksProvider';
import NotebooksGrabList from '@pages/Notebooks/NotebooksGrabList';
import FormContainer from '@components/FormContainer';
import Spacing from '@components/Spacing';

import volumesMessages from '../Volumes.messages';
import { Props } from './VolumesForm.types';
import VolumesForm from './VolumesForm';

const VolumesFormContainer = ({
  initialValues,
  databaseName,
  id,
  events,
  series,
  waves,
  waveId,
  volumeNotebooks: initialVolumeNotebooks,
}: Props): JSX.Element => (
  <NotebooksProvider initialVolumeNotebooks={initialVolumeNotebooks}>
    <FormContainer
      messages={volumesMessages}
      id={id}
      showPathname={routes.volumes.id.show.href}
      query={{ databaseName, id }}
    >
      <VolumesForm
        initialValues={initialValues}
        series={series}
        waves={waves}
        events={events}
        databaseName={databaseName}
        id={id}
        waveId={waveId}
        notebooksList={<NotebooksGrabList variant="target" />}
      />
    </FormContainer>
    <Spacing />
    <NotebooksGrabList variant="source" databaseName={databaseName} serieId={initialValues.serie_id} />
  </NotebooksProvider>
);

export default VolumesFormContainer;
