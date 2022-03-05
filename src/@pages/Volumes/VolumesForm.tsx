import routes from 'config/routes';

import SelectOption from 'types/SelectOption';
import { ApiVolume } from 'types/Volume';
import { Serie } from 'types/Serie';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import DatePicker from '@components/DatePicker';
import Select from '@components/Select';
import ImageInput from '@components/ImageInput';

import { numberFields } from './VolumeForm.consts';
import volumesMessages from './Volumes.messages';

type Props = {
  initialValues: FormPartial<ApiVolume>;
  series: Serie[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
};

const VolumesForm = ({ variant, initialValues, databaseName, id, series }: Props): JSX.Element => {
  const seriesOptions: SelectOption[] = series.map(({ id: serieId, name }) => ({ value: `${serieId}`, label: name }));

  return (
    <FormContainer
      variant={variant}
      initialValues={{ ...initialValues, date: initialValues.date ? new Date(initialValues.date) : '' }}
      databaseName={`db/${databaseName}/volumes`}
      messages={volumesMessages}
      numberFields={numberFields}
      id={id}
      showPathname={routes.volumes.id.show.href}
      query={{ databaseName, id }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="title" placeholder={volumesMessages.title} required />
          <Input name="subtitle" placeholder={volumesMessages.subtitle} />
          <ImageInput name="image_url" placeholder={volumesMessages.image_url} required />
          <DatePicker name="date" placeholder={volumesMessages.date} required />
          <Select name="serie_id" placeholder={volumesMessages.serie_id} options={seriesOptions} required />
          <Input name="order" placeholder={volumesMessages.order} required />
          <Input name="global_order" placeholder={volumesMessages.global_order} required />
          <FormActions />
        </form>
      )}
    </FormContainer>
  );
};

export default VolumesForm;
