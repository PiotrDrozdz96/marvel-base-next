import { useContext } from 'react';

import routes from 'config/routes';
import SelectOption from 'types/SelectOption';
import { ApiVolume } from 'types/Volume';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import postVolumes from '@api/post/postVolumes';
import { Form } from '@lib/react-final-form';
import { NotebooksContext } from '@pages/Notebooks/NotebooksProvider';
import NotebooksGrabList from '@pages/Notebooks/NotebooksGrabList';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import DatePicker from '@components/DatePicker';
import Select, { SelectInput } from '@components/Select';
import ImageInput from '@components/ImageInput';
import Spacing from '@components/Spacing';
import Switch from '@components/Switch';
import useSubmit from 'hooks/useSubmit';

import { numberFields, nullableFields } from '../VolumeForm.consts';
import volumesMessages from '../Volumes.messages';

type Props = {
  initialValues: FormPartial<ApiVolume>;
  seriesOptions: SelectOption[];
  wavesOptions: SelectOption[];
  eventsOptions: SelectOption[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
  waveId: string;
  setWaveId: (value: string) => void;
};

const VolumesForm = ({
  variant,
  initialValues,
  databaseName,
  seriesOptions,
  wavesOptions,
  eventsOptions,
  waveId,
  id,
  setWaveId,
}: Props): JSX.Element => {
  const { notebooksTitles } = useContext(NotebooksContext);
  const onSubmit = useSubmit<FormPartial<ApiVolume>>(
    databaseName,
    postVolumes,
    { numberFields, nullableFields, additionalValues: { notebooks: notebooksTitles } },
    variant === 'create' ? undefined : id
  );

  return (
    <>
      <FormContainer
        variant={variant}
        messages={volumesMessages}
        id={id}
        showPathname={routes.volumes.id.show.href}
        query={{ databaseName, id }}
      >
        <Form<FormPartial<ApiVolume>>
          initialValues={{
            ...initialValues,
            date: initialValues.date ? (new Date(initialValues.date) as unknown as string) : '',
          }}
          messages={volumesMessages}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input name="title" placeholder={volumesMessages.title} required />
              <Input name="subtitle" placeholder={volumesMessages.subtitle} />
              <ImageInput name="image_url" placeholder={volumesMessages.image_url} required />
              <DatePicker name="date" placeholder={volumesMessages.date} required />
              <SelectInput
                name="wave_id"
                value={waveId}
                placeholder={volumesMessages.wave_id}
                options={wavesOptions}
                onChange={(e) => setWaveId(e.target.value)}
              />
              <Select name="serie_id" placeholder={volumesMessages.serie_id} options={seriesOptions} required />
              <Select name="event_id" placeholder={volumesMessages.event_id} options={eventsOptions} />
              <Input name="order" placeholder={volumesMessages.order} />
              <Input name="global_order" placeholder={volumesMessages.global_order} />
              <Switch name="is_event" placeholder={volumesMessages.is_event} />
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
        </Form>
      </FormContainer>
      <Spacing />
      <NotebooksGrabList variant="source" databaseName={databaseName} serieId={initialValues.serie_id} />
    </>
  );
};

export default VolumesForm;
