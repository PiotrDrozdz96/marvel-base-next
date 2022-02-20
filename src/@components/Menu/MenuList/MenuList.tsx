import { MenuItem } from 'types/Menu';
import List from '@components/List';

import menuMessages from '../Menu.messages';

type Props = {
  menu: MenuItem[];
};

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url];

const MenuList = ({ menu }: Props): JSX.Element => (
  <List labels={labels}>
    {menu.map((menuItem) => (
      <tr key={menuItem.id}>
        <td>{menuItem.id}</td>
        <td>{menuItem.name}</td>
        <td>{menuItem.url}</td>
      </tr>
    ))}
  </List>
);

export default MenuList;
