import routes from 'config/routes';
import FormContainer from '@components/FormContainer';

import seriesMessages from '../Series.messages';
import { Props } from './SeriesForm.types';
import SeriesForm from './SeriesForm';

const SeriesFormContainer = ({ variant, initialValues, databaseName, id, waves }: Props): JSX.Element => (
  <FormContainer
    variant={variant}
    messages={seriesMessages}
    id={id}
    showPathname={routes.series.id.show.href}
    query={{ databaseName, id }}
  >
    <SeriesForm variant={variant} initialValues={initialValues} databaseName={databaseName} id={id} waves={waves} />
  </FormContainer>
);

export default SeriesFormContainer;
