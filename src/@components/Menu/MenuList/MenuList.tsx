import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import List from '@components/List';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';

import menuMessages from '../Menu.messages';

type Props = {
  menu: MenuItem[];
};

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url];

const MenuList = ({ menu }: Props): JSX.Element => (
  <>
    <Toolbar name={menuMessages.listName}>
      <ActionButton variant="add" href={{ pathname: routes.menu.id.href, query: { id: 'create' } }} />
    </Toolbar>
    <List labels={labels}>
      {menu.map((menuItem) => (
        <tr key={menuItem.id}>
          <td>{menuItem.id}</td>
          <td>{menuItem.name}</td>
          <td>{menuItem.url}</td>
        </tr>
      ))}
    </List>
  </>
);

export default MenuList;
