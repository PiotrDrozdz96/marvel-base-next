import NotebooksProvider from '@pages/Notebooks/NotebooksProvider';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { Notebook } from 'types/Notebook';
import SelectOption from 'types/SelectOption';
import { Serie } from 'types/Serie';
import { ApiVolume } from 'types/Volume';

import VolumesForm from './VolumesForm';

type Props = {
  initialValues: FormPartial<ApiVolume>;
  series: Serie[];
  notebooks: Notebook[];
  volumeNotebooks: Notebook[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
};

const VolumesFormContainer = ({
  variant,
  initialValues,
  databaseName,
  id,
  series,
  notebooks: initialNotebooks,
  volumeNotebooks: initialVolumeNotebooks,
}: Props): JSX.Element => {
  const seriesOptions: SelectOption[] = series.map(({ id: serieId, name }) => ({ value: `${serieId}`, label: name }));

  return (
    <NotebooksProvider initialNotebooks={initialNotebooks} initialVolumeNotebooks={initialVolumeNotebooks}>
      <VolumesForm
        initialValues={initialValues}
        seriesOptions={seriesOptions}
        variant={variant}
        databaseName={databaseName}
        id={id}
      />
    </NotebooksProvider>
  );
};

export default VolumesFormContainer;
