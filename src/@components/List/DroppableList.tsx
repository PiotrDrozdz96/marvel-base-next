'use client';

import { ReactNode, Fragment } from 'react';

import { DragDropContext, Droppable, DropResult, ResponderProvided } from '@lib/react-beautiful-dnd';

import ListTable from './ListTable';

type Props = {
  droppableId?: string;
  labels: string[];
  children: ReactNode;
  onDragEnd?: (result: DropResult, provided: ResponderProvided) => void;
};

const DroppableList = ({ droppableId = 'droppable', labels, children, onDragEnd }: Props) => {
  const ContextComponent = onDragEnd ? DragDropContext : Fragment;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contextProps = (onDragEnd ? { onDragEnd } : {}) as any;

  return (
    <ContextComponent {...contextProps}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ListTable {...provided} labels={labels}>
            {children}
          </ListTable>
        )}
      </Droppable>
    </ContextComponent>
  );
};

export default DroppableList;
