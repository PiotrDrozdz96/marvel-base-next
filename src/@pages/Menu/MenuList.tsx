'use client';

import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import List from '@components/List';
import ListRow from '@components/ListRow';
import ActionsButtons from '@components/ActionsButtons';
import useDraggableItems from 'hooks/useDraggableItems';
import width from 'utils/width';

import menuMessages from './Menu.messages';

type Props = {
  menu: MenuItem[];
  query: Pick<MenuItem, 'type' | 'parent_id'>;
};

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url, ''];

const MenuList = ({ menu, query }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(menu, 'menu');

  return (
    <List
      name={menuMessages.listName}
      addHref={{ pathname: routes.menu.id.href, query: { id: 'create', ...query } }}
      labels={labels}
      onDragEnd={onDragEnd}
    >
      {items.map((menuItem, index) => (
        <ListRow key={menuItem.id} {...getRowProps(menuItem, index)}>
          <td style={width(100)}>{menuItem.id}</td>
          <td style={width('50%')}>{menuItem.name}</td>
          <td style={width('50%')}>{menuItem.url}</td>
          <ActionsButtons resource="menu" routeItem={routes.menu} id={menuItem.id} />
        </ListRow>
      ))}
    </List>
  );
};

export default MenuList;
