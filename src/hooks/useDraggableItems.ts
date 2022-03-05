import { useState } from 'react';
import { arrayMoveImmutable } from 'array-move';

import OnDragEnd from 'types/OnDragEnd';

const useDraggableItems = <T extends { id: number }>(initialItems: T[], databaseName: string) => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd: OnDragEnd = ([source, destination]) => {
    const newItems = arrayMoveImmutable(items, source, destination);
    setItems(newItems);
    fetch(`/api/${databaseName}/reorder`, {
      method: 'POST',
      body: JSON.stringify({ ids: newItems.map(({ id }) => id) }),
    })
      .then((response) => response.json())
      .then((data) => setItems(data));
  };

  const getRowProps = (item: { id: number }, index: number) => ({
    draggableId: `${item.id}`,
    index,
    isDragDisabled: items.length === 1,
  });

  return { items, onDragEnd, getRowProps };
};

export default useDraggableItems;
