import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import List from '@components/List';
import ActionsButtons from '@components/ActionsButtons';

import menuMessages from './Menu.messages';

type Props = {
  menu: MenuItem[];
  query: Pick<MenuItem, 'type' | 'parent_id'>;
};

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url, menuMessages.order, ''];

const MenuList = ({ menu, query }: Props): JSX.Element => (
  <List
    name={menuMessages.listName}
    addHref={{ pathname: routes.menu.id.href, query: { id: 'create', ...query } }}
    addHrefAs={{ pathname: '/menu/create' }}
    labels={labels}
  >
    {menu.map((menuItem) => (
      <tr key={menuItem.id}>
        <td>{menuItem.id}</td>
        <td>{menuItem.name}</td>
        <td>{menuItem.url}</td>
        <td>{menuItem.order}</td>
        <ActionsButtons routeItem={routes.menu} id={menuItem.id} databaseName="menu" />
      </tr>
    ))}
  </List>
);

export default MenuList;
