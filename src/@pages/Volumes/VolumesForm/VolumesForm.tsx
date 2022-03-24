import { useContext } from 'react';

import routes from 'config/routes';
import SelectOption from 'types/SelectOption';
import { ApiVolume } from 'types/Volume';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import { NotebooksContext } from '@pages/Notebooks/NotebooksProvider';
import NotebooksGrabList from '@pages/Notebooks/NotebooksGrabList';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import DatePicker from '@components/DatePicker';
import Select from '@components/Select';
import ImageInput from '@components/ImageInput';
import Spacing from '@components/Spacing';

import { numberFields } from '../VolumeForm.consts';
import volumesMessages from '../Volumes.messages';

type Props = {
  initialValues: FormPartial<ApiVolume>;
  seriesOptions: SelectOption[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
};

const VolumesForm = ({ variant, initialValues, databaseName, seriesOptions, id }: Props): JSX.Element => {
  const { notebooksIds } = useContext(NotebooksContext);

  return (
    <>
      <FormContainer
        variant={variant}
        initialValues={{ ...initialValues, date: initialValues.date ? new Date(initialValues.date) : '' }}
        databaseName={`db/${databaseName}/volumes`}
        messages={volumesMessages}
        numberFields={numberFields}
        id={id}
        showPathname={routes.volumes.id.show.href}
        query={{ databaseName, id }}
        additionalValues={{ notebooks_ids: notebooksIds }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input name="title" placeholder={volumesMessages.title} required />
            <Input name="subtitle" placeholder={volumesMessages.subtitle} />
            <ImageInput name="image_url" placeholder={volumesMessages.image_url} required />
            <DatePicker name="date" placeholder={volumesMessages.date} required />
            <Select name="serie_id" placeholder={volumesMessages.serie_id} options={seriesOptions} required />
            <Input name="order" placeholder={volumesMessages.order} />
            <Input name="global_order" placeholder={volumesMessages.global_order} />
            <FormActions
              backHref={{ pathname: routes.series.id.show.href, query: { id: initialValues.serie_id, databaseName } }}
            />
            <Spacing />
            <NotebooksGrabList variant="target" />
            <FormActions
              backHref={{ pathname: routes.series.id.show.href, query: { id: initialValues.serie_id, databaseName } }}
            />
          </form>
        )}
      </FormContainer>
      <Spacing />
      <NotebooksGrabList
        variant="source"
        databaseName={databaseName}
        seriesOptions={seriesOptions}
        serieId={initialValues.serie_id}
      />
    </>
  );
};

export default VolumesForm;
