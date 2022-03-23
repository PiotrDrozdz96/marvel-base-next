import { ReactNode, Fragment } from 'react';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';

import Container from '@components/Container';
import Toolbar from '@components/Toolbar';
import ActionButton, { ActionButtonProps } from '@components/ActionButton';

import classes from './List.module.scss';

type Props = {
  name: string;
  droppableId?: string;
  filters?: ReactNode;
  labels: string[];
  children: ReactNode;
  actions?: ReactNode;
  bottomActions?: ReactNode;
  addHref?: ActionButtonProps['href'];
  addHrefAs?: ActionButtonProps['as'];
  onDragEnd?: (result: DropResult, provided: ResponderProvided) => void;
};

const List = ({
  name,
  droppableId = 'droppable',
  filters,
  addHref,
  addHrefAs,
  labels,
  children,
  actions,
  bottomActions,
  onDragEnd,
}: Props) => {
  const ContextComponent = onDragEnd ? DragDropContext : Fragment;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contextProps = (onDragEnd ? { onDragEnd } : {}) as any;

  return (
    <Container>
      <Toolbar name={name} filters={filters}>
        {!!addHref && <ActionButton variant="add" href={addHref} as={addHrefAs} />}
        {actions}
      </Toolbar>
      <ContextComponent {...contextProps}>
        <Droppable droppableId={droppableId}>
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
      </ContextComponent>
      {bottomActions}
    </Container>
  );
};

export default List;
