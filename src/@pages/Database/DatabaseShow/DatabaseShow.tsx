import routes from 'config/routes';
import Database from 'types/Database';
import Show from '@components/Show';
import TextField from '@components/TextField';
import { interpolate } from 'utils/interpolate';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from '../Database.messages';

type Props = {
  item: Database;
};

const MenuShow = ({ item }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(databaseMessages.itemName, { id: item.name })}
      editHref={{ pathname: routes.db.id.href, query: { id: item.name } }}
    >
      <TextField label={databaseMessages.name} value={item.name} />
      <TextField label={databaseMessages.size} value={formattedFileSize(item.size)} />
    </Show>
    {/* {item.type === 'MAIN_MENU' && <MenuList menu={item.items || []} query={{ type: 'SUB_MENU', parent_id: item.id }} />} */}
  </>
);

export default MenuShow;
