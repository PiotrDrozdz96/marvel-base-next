import routes from 'config/routes';
import Database from 'types/Database';
import Container from '@components/Container';
import Paper from '@components/Paper';
import TextField from '@components/TextField';
import FormActions from '@components/FormActions';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';
import { interpolate } from 'utils/interpolate';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from '../Database.messages';

type Props = {
  item: Database;
};

const MenuShow = ({ item }: Props): JSX.Element => (
  <>
    <Container>
      <Toolbar name={interpolate(databaseMessages.itemName, { id: item.name })}>
        <ActionButton variant="edit" href={{ pathname: routes.db.id.href, query: { id: item.name } }} />
      </Toolbar>
      <Paper>
        <TextField label={databaseMessages.name} value={item.name} />
        <TextField label={databaseMessages.size} value={formattedFileSize(item.size)} />
        <FormActions withoutSave />
      </Paper>
    </Container>
    {/* {item.type === 'MAIN_MENU' && <MenuList menu={item.items || []} query={{ type: 'SUB_MENU', parent_id: item.id }} />} */}
  </>
);

export default MenuShow;
