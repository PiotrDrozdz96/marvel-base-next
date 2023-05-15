'use client';

import routes from 'config/routes';

import SelectOption from 'types/SelectOption';
import { ApiSerie } from 'types/Serie';
import { Wave } from 'types/Wave';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import Select from '@components/Select';
import Switch from '@components/Switch';

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

  return (
    <FormContainer
      variant={variant}
      initialValues={initialValues}
      databaseName={`db/${databaseName}/series`}
      messages={seriesMessages}
      numberFields={numberFields}
      id={id}
      showPathname={routes.series.id.show.href}
      query={{ databaseName, id }}
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
    </FormContainer>
  );
};

export default SeriesForm;
