import { useState, useEffect } from 'react';
import { arrayMoveImmutable } from 'array-move';

import { DropResult } from '@lib/react-beautiful-dnd';
import reorderApi from '@api/reorder';
import OrderField from 'types/OrderField';

const useDraggableItems = <T extends { id: number }>(
  initialItems: T[],
  databaseName: string,
  itemsName: string,
  field: OrderField = 'order'
) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination) {
      const newItems = arrayMoveImmutable(items, source.index, destination.index);
      setItems(newItems);
      reorderApi(
        databaseName,
        itemsName,
        newItems.map((item) => item.id),
        field
      );
    }
  };

  const getRowProps = (item: { id: number }, index: number) => ({
    draggableId: `${item.id}`,
    index,
    isDragDisabled: items.length === 1,
  });

  return { items, onDragEnd, getRowProps };
};

export default useDraggableItems;
