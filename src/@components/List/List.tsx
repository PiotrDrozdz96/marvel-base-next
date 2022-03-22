import { ReactNode } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import OnDragEnd from 'types/OnDragEnd';
import Container from '@components/Container';
import Toolbar from '@components/Toolbar';
import ActionButton, { ActionButtonProps } from '@components/ActionButton';

import classes from './List.module.scss';

type Props = {
  name: string;
  filters?: ReactNode;
  labels: string[];
  children: ReactNode;
  actions?: ReactNode;
  bottomActions?: ReactNode;
  addHref?: ActionButtonProps['href'];
  addHrefAs?: ActionButtonProps['as'];
  onDragEnd?: OnDragEnd;
};

const List = ({
  name,
  filters,
  addHref,
  addHrefAs,
  labels,
  children,
  actions,
  bottomActions,
  onDragEnd = () => {},
}: Props) => (
  <Container>
    <Toolbar name={name} filters={filters}>
      {!!addHref && <ActionButton variant="add" href={addHref} as={addHrefAs} />}
      {actions}
    </Toolbar>
    <DragDropContext
      onDragEnd={({ source, destination }) => {
        if (destination) {
          onDragEnd([source.index, destination.index]);
        }
      }}
    >
      <Droppable droppableId="droppable">
        {(provided) => (
          <table {...provided.droppableProps} ref={provided.innerRef} className={classes.table}>
            <thead>
              <tr>
                {labels.map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
            <tbody>{provided.placeholder}</tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
    {bottomActions}
  </Container>
);

export default List;
