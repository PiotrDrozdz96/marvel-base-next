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

import seriesMessages from './Series.messages';

type Props = {
  initialValues: FormPartial<ApiSerie>;
  waves: Wave[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
};

const SeriesForm = ({ variant, initialValues, databaseName, id, waves }: Props): JSX.Element => {
  const wavesOptions: SelectOption[] = waves.map(({ id: waveId, name }) => ({ value: waveId, label: name }));

  return (
    <FormContainer
      variant={variant}
      initialValues={initialValues}
      databaseName={`db/${databaseName}/series`}
      messages={seriesMessages}
      numberFields={['order', 'wave_id']}
      id={id}
      showPathname={routes.series.id.show.href}
      query={{ databaseName, id }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder={seriesMessages.name} required />
          <Input name="order" placeholder={seriesMessages.order} required />
          <Select name="wave_id" placeholder={seriesMessages.waveId} options={wavesOptions} required />
          <FormActions />
        </form>
      )}
    </FormContainer>
  );
};

export default SeriesForm;
