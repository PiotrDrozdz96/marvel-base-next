import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import iconMap from 'consts/menuIconMap';
import Container from '@components/Container';
import Paper from '@components/Paper';
import TextField from '@components/TextField';
import FormActions from '@components/FormActions';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';
import Spacing from '@components/Spacing';
import { interpolate } from 'utils/interpolate';

import menuMessages from '../Menu.messages';
import MenuList from '../MenuList';

type Props = {
  menu: MenuItem[];
  item: MenuItem;
};

const MenuShow = ({ menu, item }: Props): JSX.Element => (
  <>
    <Container>
      <Toolbar name={interpolate(menuMessages.itemName, { id: item.id })}>
        <ActionButton variant="edit" href={{ pathname: routes.menu.id.href, query: { id: item.id } }} />
      </Toolbar>
      <Paper>
        <TextField label={menuMessages.id} value={item.id} />
        <TextField label={menuMessages.name} value={item.name} />
        <TextField label={menuMessages.type} value={item.type} />
        <TextField label={menuMessages.url} value={item.url} />
        <TextField label={menuMessages.icon} value={!!item.icon && iconMap[item.icon]} />
        <TextField
          label={menuMessages.parent_id}
          value={!!item.parent_id && menu.find(({ id }) => id === item.parent_id)?.name}
        />
        <TextField label={menuMessages.order} value={item.order} />
        <FormActions withoutSave />
      </Paper>
    </Container>
    {item.type === 'MAIN_MENU' && (
      <>
        <Spacing />
        <MenuList menu={item.items || []} query={{ type: 'SUB_MENU', parent_id: item.id }} />
      </>
    )}
  </>
);

export default MenuShow;
