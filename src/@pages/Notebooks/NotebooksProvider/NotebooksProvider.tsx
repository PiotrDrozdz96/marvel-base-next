import { ReactNode, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { arrayMoveImmutable } from 'array-move';

import { Notebook } from 'types/Notebook';

import { NotebooksContext } from './NotebooksProvider.context';

type Props = {
  initialNotebooks: Notebook[];
  initialVolumeNotebooks: Notebook[];
  children: ReactNode;
};

const NotebooksProvider = ({ initialNotebooks, initialVolumeNotebooks, children }: Props): JSX.Element => {
  const [notebooks, setNotebooks] = useState(initialNotebooks);
  const [volumeNotebooks, setVolumeNotebooks] = useState(initialVolumeNotebooks);

  const onDragEnd = ({ source, destination }: DropResult): void => {
    if (source.droppableId === 'source' && destination?.droppableId === 'target') {
      const newNotebook = notebooks[source.index];
      if (!volumeNotebooks.map(({ id }) => id).includes(newNotebook.id)) {
        const newVolumeNotebooks = [...volumeNotebooks];
        newVolumeNotebooks.splice(destination.index, 0, newNotebook);
        setVolumeNotebooks(newVolumeNotebooks);
      }
    } else if (source.droppableId === 'target' && destination?.droppableId !== 'target') {
      const newVolumeNotebooks = [...volumeNotebooks];
      newVolumeNotebooks.splice(source.index, 1);
      setVolumeNotebooks(newVolumeNotebooks);
    } else if (source.droppableId === 'target' && destination?.droppableId === 'target') {
      const newVolumeNotebooks = arrayMoveImmutable(volumeNotebooks, source.index, destination.index);
      setVolumeNotebooks(newVolumeNotebooks);
    }
  };

  return (
    <NotebooksContext.Provider
      value={{
        notebooks,
        volumeNotebooks,
        setNotebooks,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </NotebooksContext.Provider>
  );
};

export default NotebooksProvider;
