'use client';

import { ReactNode } from 'react';

import { Droppable } from '@lib/react-beautiful-dnd';

import ListTable from './ListTable';

type Props = {
  droppableId?: string;
  labels: string[];
  children: ReactNode;
};

const BaseDroppableList = ({ droppableId = 'droppable', labels, children }: Props) => (
  <Droppable droppableId={droppableId}>
    {(provided) => (
      <ListTable {...provided} labels={labels}>
        {children}
      </ListTable>
    )}
  </Droppable>
);

export default BaseDroppableList;
