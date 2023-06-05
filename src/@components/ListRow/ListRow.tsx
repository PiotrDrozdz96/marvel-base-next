import { ReactNode } from 'react';

import { Draggable } from '@lib/react-beautiful-dnd';

type Props = {
  draggableId: string;
  index: number;
  children: ReactNode;
  isDragDisabled?: boolean;
};

const ListRow = ({ draggableId, index, isDragDisabled, children }: Props): JSX.Element => (
  <Draggable draggableId={draggableId} index={index} isDragDisabled={isDragDisabled}>
    {(itemProvided) => (
      <tr
        ref={itemProvided.innerRef}
        {...itemProvided.draggableProps}
        {...itemProvided.dragHandleProps}
        style={itemProvided.draggableProps.style}
      >
        {children}
      </tr>
    )}
  </Draggable>
);

export default ListRow;
