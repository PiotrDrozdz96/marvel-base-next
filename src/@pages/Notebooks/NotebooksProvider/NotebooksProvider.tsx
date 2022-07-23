import { ReactNode, useState, useMemo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { arrayMoveImmutable } from 'array-move';

import { ApiNotebook } from 'types/Notebook';

import { NotebooksContext } from './NotebooksProvider.context';

type Props = {
  initialVolumeNotebooks: ApiNotebook[];
  children: ReactNode;
};

const NotebooksProvider = ({ initialVolumeNotebooks, children }: Props): JSX.Element => {
  const [notebooks, setNotebooks] = useState<ApiNotebook[]>([]);
  const [volumeNotebooks, setVolumeNotebooks] = useState(initialVolumeNotebooks);

  const notebooksTitles = useMemo(() => volumeNotebooks.map((notebook) => notebook.title_long), [volumeNotebooks]);
  const filteredNotebooks = useMemo(
    () => notebooks.filter((notebook) => !notebooksTitles.includes(notebook.title_long)),
    [notebooks, notebooksTitles]
  );

  const onDragEnd = ({ source, destination }: DropResult): void => {
    if (source.droppableId === 'source' && destination?.droppableId === 'target') {
      const newNotebook = filteredNotebooks[source.index];
      if (!volumeNotebooks.map(({ title_long: titleLong }) => titleLong).includes(newNotebook.title_long)) {
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
        notebooks: filteredNotebooks,
        volumeNotebooks,
        notebooksTitles,
        setNotebooks,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </NotebooksContext.Provider>
  );
};

export default NotebooksProvider;
