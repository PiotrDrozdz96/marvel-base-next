import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import iconMap from 'consts/menuIconMap';
import Container from '@components/Container';
import Paper from '@components/Paper';
import TextField from '@components/TextField';
import FormActions from '@components/FormActions';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';
import { interpolate } from 'utils/interpolate';

import menuMessages from '../Menu.messages';

type Props = {
  menu: MenuItem[];
  item: MenuItem;
};

const MenuShow = ({ menu, item }: Props): JSX.Element => {
  console.log('siema');

  return (
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
        <TextField label={menuMessages.parent_id} value={item.parent_id} />
        <TextField label={menuMessages.order} value={item.order} />
        <FormActions withoutSave />
      </Paper>
    </Container>
  );
};

export default MenuShow;
