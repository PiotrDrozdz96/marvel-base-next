'use client';

import routes from 'config/routes';

import SelectOption from 'types/SelectOption';
import { ApiSerie } from 'types/Serie';
import { Wave } from 'types/Wave';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import { Form } from '@lib/react-final-form';
import postSeries from '@api/post/postSeries';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import Select from '@components/Select';
import Switch from '@components/Switch';
import useSubmit from 'hooks/useSubmit';

import { numberFields } from './SeriesForm.consts';
import seriesMessages from './Series.messages';

type Props = {
  initialValues: FormPartial<ApiSerie, 'is_filter'>;
  waves: Wave[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
};

const SeriesForm = ({ variant, initialValues, databaseName, id, waves }: Props): JSX.Element => {
  const wavesOptions: SelectOption[] = waves.map(({ id: waveId, name }) => ({ value: `${waveId}`, label: name }));

  const onSubmit = useSubmit<FormPartial<ApiSerie, 'is_filter'>>(
    databaseName,
    postSeries,
    { numberFields },
    variant === 'create' ? undefined : id
  );

  return (
    <FormContainer
      variant={variant}
      messages={seriesMessages}
      id={id}
      showPathname={routes.series.id.show.href}
      query={{ databaseName, id }}
    >
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
    </FormContainer>
  );
};

export default SeriesForm;
