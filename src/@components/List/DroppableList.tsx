'use client';

import { ReactNode } from 'react';

import { DragDropContext } from '@lib/react-beautiful-dnd';

import ListRow from '@components/ListRow';
import useDraggableItems from 'hooks/useDraggableItems';

import BaseDroppableList from './BaseDroppableList';

type Props = {
  initialItems: { id: number }[];
  databaseName: string;
  labels: string[];
  rows: Record<number, ReactNode>;
  field?: 'order' | 'global_order';
};

const DroppableList = ({ databaseName, initialItems, field = 'order', labels, rows }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(initialItems, databaseName, field);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BaseDroppableList labels={labels}>
        {items.map((menuItem, index) => (
          <ListRow key={menuItem.id} {...getRowProps(menuItem, index)}>
            {rows[menuItem.id]}
          </ListRow>
        ))}
      </BaseDroppableList>
    </DragDropContext>
  );
};

export default DroppableList;
