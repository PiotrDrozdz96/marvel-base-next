import { useState, useEffect } from 'react';
import { arrayMoveImmutable } from 'array-move';

import OnDragEnd from 'types/OnDragEnd';

const useDraggableItems = <T extends { id: number }>(
  initialItems: T[],
  databaseName: string,
  field: 'order' | 'global_order' = 'order'
) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const reorder = (newItems: T[]) => {
    setItems(newItems);
    fetch(`/api/${databaseName}/reorder`, {
      method: 'POST',
      body: JSON.stringify({ ids: newItems.map(({ id }) => id), field }),
    })
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  const onDragEnd: OnDragEnd = ([source, destination]) => {
    const newItems = arrayMoveImmutable(items, source, destination);
    reorder(newItems);
  };

  const getRowProps = (item: { id: number }, index: number) => ({
    draggableId: `${item.id}`,
    index,
    isDragDisabled: items.length === 1,
  });

  return { items, onDragEnd, reorder, getRowProps };
};

export default useDraggableItems;
