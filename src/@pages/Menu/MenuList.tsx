import { ReactNode } from 'react';

import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import { ListWrapper, DroppableList } from '@components/List';
import ActionsButtons from '@components/ActionsButtons';
import width from 'utils/width';

import menuMessages from './Menu.messages';

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url, ''];

const getRows = (menu: MenuItem[]) => {
  const rows: Record<number, ReactNode> = {};

  menu.forEach((menuItem) => {
    rows[menuItem.id] = (
      <>
        <td style={width(100)}>{menuItem.id}</td>
        <td style={width('50%')}>{menuItem.name}</td>
        <td style={width('50%')}>{menuItem.url}</td>
        <ActionsButtons resource="menu" routeItem={routes.menu} id={menuItem.id} />
      </>
    );
  });

  return rows;
};

type Props = {
  menu: MenuItem[];
  query: Pick<MenuItem, 'type' | 'parent_id'>;
};

const MenuListWrapper = ({ query, menu }: Props) => (
  <ListWrapper
    name={menuMessages.listName}
    addHref={{ pathname: routes.menu.id.href, query: { id: 'create', ...query } }}
  >
    <DroppableList initialItems={menu} databaseName="menu" labels={labels} rows={getRows(menu)} />
  </ListWrapper>
);

export default MenuListWrapper;
