import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import List from '@components/List';
import Toolbar from '@components/Toolbar';
import ActionsButtons from '@components/ActionsButtons';
import ActionButton from '@components/ActionButton';
import Container from '@components/Container';

import menuMessages from '../Menu.messages';

type Props = {
  menu: MenuItem[];
  query: Pick<MenuItem, 'type' | 'parent_id'>;
};

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url, menuMessages.order, ''];

const MenuList = ({ menu, query }: Props): JSX.Element => (
  <Container>
    <Toolbar name={menuMessages.listName}>
      <ActionButton
        variant="add"
        href={{ pathname: routes.menu.id.href, query: { id: 'create', ...query } }}
        as={{ pathname: '/menu/create' }}
      />
    </Toolbar>
    <List labels={labels}>
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
  </Container>
);

export default MenuList;
