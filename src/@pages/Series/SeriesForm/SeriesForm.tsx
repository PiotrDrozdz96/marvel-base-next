'use client';

import routes from 'config/routes';

import SelectOption from 'types/SelectOption';
import { ApiSerie } from 'types/Serie';
import FormPartial from 'types/FormPartial';
import { Form } from '@lib/react-final-form';
import postSeries from '@api/post/postSeries';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import Select from '@components/Select';
import Switch from '@components/Switch';
import useSubmit from 'hooks/useSubmit';

import { numberFields } from '../SeriesForm.consts';
import seriesMessages from '../Series.messages';
import { Props } from './SeriesForm.types';

const SeriesForm = ({ variant, initialValues, databaseName, id, waves }: Props): JSX.Element => {
  const wavesOptions: SelectOption[] = waves.map(({ id: waveId, name }) => ({ value: `${waveId}`, label: name }));

  const onSubmit = useSubmit<FormPartial<ApiSerie, 'is_filter'>>(
    databaseName,
    postSeries,
    { numberFields },
    variant === 'create' ? undefined : id
  );

  return (
    <Form<FormPartial<ApiSerie, 'is_filter'>>
      initialValues={initialValues}
      messages={seriesMessages}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder={seriesMessages.name} required />
          <Select name="wave_id" placeholder={seriesMessages.waveId} options={wavesOptions} required />
          <Input name="order" placeholder={seriesMessages.order} />
          <Switch name="is_filter" placeholder={seriesMessages.isFilter} />
          <FormActions backHref={{ pathname: routes.db.id.show.href, query: { databaseName } }} />
        </form>
      )}
    </Form>
  );
};

export default SeriesForm;
