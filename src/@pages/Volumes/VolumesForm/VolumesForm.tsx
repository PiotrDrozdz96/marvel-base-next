'use client';

import { useState, useMemo, useEffect, useContext, ReactNode } from 'react';

import routes from 'config/routes';
import SelectOption from 'types/SelectOption';
import { ApiVolume } from 'types/Volume';
import FormPartial from 'types/FormPartial';
import postVolumes from '@api/post/postVolumes';
import getSeries from '@api/get/front/getSeries';
import { Form } from '@lib/react-final-form';
import { NotebooksContext } from '@pages/Notebooks/NotebooksProvider';
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
import { Props as ContainerProps } from './VolumesForm.types';

type Props = Omit<ContainerProps, 'volumeNotebooks'> & {
  notebooksList: ReactNode;
};

const VolumesForm = ({
  initialValues,
  databaseName,
  waves,
  series: initialSeries,
  events,
  waveId: initialWaveId,
  id,
  notebooksList,
}: Props): JSX.Element => {
  const { notebooksTitles } = useContext(NotebooksContext);
  const wavesOptions: SelectOption[] = waves.map(({ id: wavesId, name }) => ({ value: `${wavesId}`, label: name }));
  const eventsOptions: SelectOption[] = events.map(({ id: eventId, title }) => ({ value: `${eventId}`, label: title }));
  const [waveId, setWaveId] = useState(initialWaveId);
  const [series, setSeries] = useState(initialSeries);

  const seriesOptions: SelectOption[] = useMemo(
    () => series.map(({ id: serieId, name }) => ({ value: `${serieId}`, label: name })),
    [series]
  );

  useEffect(() => {
    const fetchSeries = async () => {
      const newSeries = await getSeries(databaseName, Number(waveId));

      setSeries(newSeries || []);
    };

    if (waveId === initialWaveId) {
      setSeries(initialSeries);
    } else {
      fetchSeries();
    }
  }, [waveId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = useSubmit<FormPartial<ApiVolume>>(
    databaseName,
    postVolumes,
    { numberFields, nullableFields, additionalValues: { notebooks: notebooksTitles } },
    id
  );

  return (
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
          {notebooksList}
          <FormActions
            backHref={{ pathname: routes.series.id.show.href, query: { id: initialValues.serie_id, databaseName } }}
          />
        </form>
      )}
    </Form>
  );
};

export default VolumesForm;
