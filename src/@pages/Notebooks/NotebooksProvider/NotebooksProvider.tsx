import { ReactNode, useState, useMemo, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { arrayMoveImmutable } from 'array-move';

import { Notebook } from 'types/Notebook';
import { Serie } from 'types/Serie';
import SelectOption from 'types/SelectOption';
import getFetch from 'utils/getFetch';

import { NotebooksContext } from './NotebooksProvider.context';

type Props = {
  databaseName: string;
  initialWaveId: string;
  initialSeries: Serie[];
  initialNotebooks: Notebook[];
  initialVolumeNotebooks: Notebook[];
  children: ReactNode;
};

const NotebooksProvider = ({
  databaseName,
  initialSeries,
  initialWaveId,
  initialNotebooks,
  initialVolumeNotebooks,
  children,
}: Props): JSX.Element => {
  const [waveId, setWaveId] = useState(initialWaveId);
  const [series, setSeries] = useState(initialSeries);
  const [notebooks, setNotebooks] = useState(initialNotebooks);
  const [volumeNotebooks, setVolumeNotebooks] = useState(initialVolumeNotebooks);

  const notebooksIds = useMemo(() => volumeNotebooks.map((notebook) => Number(notebook.id)), [volumeNotebooks]);
  const filteredNotebooks = useMemo(
    () => notebooks.filter((notebook) => !notebooksIds.includes(notebook.id)),
    [notebooks, notebooksIds]
  );

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

  const onDragEnd = ({ source, destination }: DropResult): void => {
    if (source.droppableId === 'source' && destination?.droppableId === 'target') {
      const newNotebook = filteredNotebooks[source.index];
      if (!volumeNotebooks.map(({ id }) => id).includes(newNotebook.id)) {
        const newVolumeNotebooks = [...volumeNotebooks];
        newVolumeNotebooks.splice(destination.index, 0, newNotebook);
        setVolumeNotebooks(newVolumeNotebooks);
        window.scrollTo({
          top: document.documentElement.scrollTop + 106,
          behavior: 'smooth',
        });
      }
    } else if (source.droppableId === 'target' && destination?.droppableId !== 'target') {
      const newVolumeNotebooks = [...volumeNotebooks];
      newVolumeNotebooks.splice(source.index, 1);
      setVolumeNotebooks(newVolumeNotebooks);
      window.scrollTo({
        top: document.documentElement.scrollTop - 106,
        behavior: 'smooth',
      });
    } else if (source.droppableId === 'target' && destination?.droppableId === 'target') {
      const newVolumeNotebooks = arrayMoveImmutable(volumeNotebooks, source.index, destination.index);
      setVolumeNotebooks(newVolumeNotebooks);
    }
  };

  return (
    <NotebooksContext.Provider
      value={{
        seriesOptions,
        waveId,
        notebooks: filteredNotebooks,
        volumeNotebooks,
        notebooksIds,
        setNotebooks,
        setWaveId,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </NotebooksContext.Provider>
  );
};

export default NotebooksProvider;
