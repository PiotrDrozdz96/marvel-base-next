import { useState, useMemo, useEffect } from 'react';

import NotebooksProvider from '@pages/Notebooks/NotebooksProvider';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { Notebook } from 'types/Notebook';
import SelectOption from 'types/SelectOption';
import { Serie } from 'types/Serie';
import { Wave } from 'types/Wave';
import { ApiVolume } from 'types/Volume';
import getFetch from 'utils/getFetch';

import VolumesForm from './VolumesForm';

type Props = {
  initialValues: FormPartial<ApiVolume>;
  waves: Wave[];
  series: Serie[];
  notebooks: Notebook[];
  volumeNotebooks: Notebook[];
  variant: FormVariant;
  databaseName: string;
  id?: number;
  waveId: string;
};

const VolumesFormContainer = ({
  variant,
  initialValues,
  databaseName,
  id,
  series: initialSeries,
  waves,
  waveId: initialWaveId,
  notebooks: initialNotebooks,
  volumeNotebooks: initialVolumeNotebooks,
}: Props): JSX.Element => {
  const wavesOptions: SelectOption[] = waves.map(({ id: wavesId, name }) => ({ value: `${wavesId}`, label: name }));
  const [waveId, setWaveId] = useState(initialWaveId);
  const [series, setSeries] = useState(initialSeries);

  const seriesOptions: SelectOption[] = useMemo(
    () => series.map(({ id: serieId, name }) => ({ value: `${serieId}`, label: name })),
    [series]
  );

  useEffect(() => {
    const fetchSeries = async () => {
      const { series: newSeries } = await getFetch<{ series: Serie[] }>(`/api/db/${databaseName}/series`, {
        wave_id: waveId,
      });

      setSeries(newSeries || []);
    };

    if (waveId === initialWaveId) {
      setSeries(initialSeries);
    } else {
      fetchSeries();
    }
  }, [waveId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NotebooksProvider
      databaseName={databaseName}
      initialWaveId={initialWaveId}
      initialSeries={initialSeries}
      initialNotebooks={initialNotebooks}
      initialVolumeNotebooks={initialVolumeNotebooks}
    >
      <VolumesForm
        initialValues={initialValues}
        seriesOptions={seriesOptions}
        wavesOptions={wavesOptions}
        variant={variant}
        databaseName={databaseName}
        id={id}
        waveId={waveId}
        setWaveId={setWaveId}
      />
    </NotebooksProvider>
  );
};

export default VolumesFormContainer;
