import routes from 'config/routes';
import { MenuItem } from 'types/Menu';
import iconMap from 'consts/menuIconMap';
import TextField from '@components/TextField';
import Show from '@components/Show';
import Spacing from '@components/Spacing';
import { interpolate } from 'utils/interpolate';

import menuMessages from './Menu.messages';
import MenuList from './MenuList';

type Props = {
  item: MenuItem;
  parentName?: string;
};

const MenuShow = ({ item, parentName }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(menuMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.menu.id.href, query: { id: item.id } }}
      backHref={{ pathname: routes.settings.href }}
    >
      <TextField label={menuMessages.id} value={item.id} />
      <TextField label={menuMessages.name} value={item.name} />
      <TextField label={menuMessages.type} value={item.type} />
      <TextField label={menuMessages.url} value={item.url} />
      <TextField label={menuMessages.icon} value={!!item.icon && iconMap[item.icon]} />
      <TextField label={menuMessages.parent_id} value={parentName} />
      <TextField label={menuMessages.order} value={item.order} />
    </Show>
    {item.type === 'MAIN_MENU' && (
      <>
        <Spacing />
        <MenuList menu={item.items || []} query={{ type: 'SUB_MENU', parent_id: item.id }} />
      </>
    )}
  </>
);

export default MenuShow;
