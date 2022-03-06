import routes from 'config/routes';

import SelectOption from 'types/SelectOption';
import { ApiNotebook } from 'types/Notebook';
import { Serie } from 'types/Serie';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import DatePicker from '@components/DatePicker';
import Select from '@components/Select';
import ImageInput from '@components/ImageInput';

import { numberFields } from './NotebookForm.consts';
import notebooksMessages from './Notebooks.messages';

type Props = {
  initialValues: FormPartial<ApiNotebook>;
  series: Serie[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
};

const NotebooksForm = ({ variant, initialValues, databaseName, id, series }: Props): JSX.Element => {
  const seriesOptions: SelectOption[] = series.map(({ id: serieId, name }) => ({ value: `${serieId}`, label: name }));

  return (
    <FormContainer
      variant={variant}
      initialValues={{ ...initialValues, date: initialValues.date ? new Date(initialValues.date) : '' }}
      databaseName={`db/${databaseName}/notebooks`}
      messages={notebooksMessages}
      numberFields={numberFields}
      id={id}
      showPathname={routes.notebooks.id.show.href}
      query={{ databaseName, id }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input name="title" placeholder={notebooksMessages.title} required />
          <Input name="subtitle" placeholder={notebooksMessages.subtitle} />
          <Input name="vol" placeholder={notebooksMessages.vol} />
          <Input name="no" placeholder={notebooksMessages.no} />
          <ImageInput name="image_url" placeholder={notebooksMessages.image_url} required />
          <DatePicker name="date" placeholder={notebooksMessages.date} required />
          <Select name="serie_id" placeholder={notebooksMessages.serie_id} options={seriesOptions} required />
          <Input name="order" placeholder={notebooksMessages.order} />
          <FormActions
            backHref={{ pathname: routes.series.id.show.href, query: { id: initialValues.serie_id, databaseName } }}
          />
        </form>
      )}
    </FormContainer>
  );
};

export default NotebooksForm;
