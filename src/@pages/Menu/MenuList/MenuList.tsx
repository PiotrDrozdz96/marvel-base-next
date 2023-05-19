'use client';

import { ReactNode } from 'react';

import { MenuItem } from 'types/Menu';
import { DroppableList } from '@components/List';
import ListRow from '@components/ListRow';
import useDraggableItems from 'hooks/useDraggableItems';

import menuMessages from '../Menu.messages';

type Props = {
  menu: MenuItem[];
  rows: Record<number, ReactNode>;
};

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url, ''];

const MenuList = ({ menu, rows }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(menu, 'menu');

  return (
    <DroppableList labels={labels} onDragEnd={onDragEnd}>
      {items.map((menuItem, index) => (
        <ListRow key={menuItem.id} {...getRowProps(menuItem, index)}>
          {rows[menuItem.id]}
        </ListRow>
      ))}
    </DroppableList>
  );
};

export default MenuList;
