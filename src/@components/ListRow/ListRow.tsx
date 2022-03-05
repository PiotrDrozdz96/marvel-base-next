import { ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  draggableId: string;
  index: number;
  children: ReactNode;
};

const ListRow = ({ draggableId, index, children }: Props): JSX.Element => (
  <Draggable draggableId={draggableId} index={index}>
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
