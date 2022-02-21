import { useRouter } from 'next/router';

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
};

const labels: string[] = [menuMessages.id, menuMessages.name, menuMessages.url, menuMessages.order, ''];

const MenuList = ({ menu }: Props): JSX.Element => {
  const router = useRouter();

  const onDelete = (id: number) => async () => {
    // eslint-disable-next-line compat/compat
    await fetch(`/api/delete/menu/${id}`, {
      method: 'DELETE',
    });
    router.replace(router.asPath);
  };

  return (
    <Container>
      <Toolbar name={menuMessages.listName}>
        <ActionButton
          variant="add"
          href={{ pathname: routes.menu.id.href, query: { id: 'create', type: 'MAIN_MENU' } }}
          as={{ pathname: 'menu/create' }}
        />
      </Toolbar>
      <List labels={labels}>
        {menu.map((menuItem) => (
          <tr key={menuItem.id}>
            <td>{menuItem.id}</td>
            <td>{menuItem.name}</td>
            <td>{menuItem.url}</td>
            <td>{menuItem.order}</td>
            <td style={{ width: 290 }}>
              <ActionsButtons>
                <ActionButton
                  variant="show"
                  href={{ pathname: routes.menu.id.show.href, query: { id: menuItem.id } }}
                />
                <ActionButton variant="edit" href={{ pathname: routes.menu.id.href, query: { id: menuItem.id } }} />
                <ActionButton variant="delete" itemName={`#${menuItem.id}`} onDelete={onDelete(menuItem.id)} />
              </ActionsButtons>
            </td>
          </tr>
        ))}
      </List>
    </Container>
  );
};

export default MenuList;
