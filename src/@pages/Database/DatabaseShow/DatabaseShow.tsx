import routes from 'config/routes';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import Show from '@components/Show';
import TextField from '@components/TextField';
import Spacing from '@components/Spacing';
import WavesList from '@pages/Waves/WavesList';
import { interpolate } from 'utils/interpolate';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from '../Database.messages';

type Props = {
  item: Database;
  waves: Wave[];
};

const DatabaseShow = ({ item, waves }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(databaseMessages.itemName, { id: item.name })}
      editHref={{ pathname: routes.db.id.href, query: { databaseName: item.name } }}
    >
      <TextField label={databaseMessages.name} value={item.name} />
      <TextField label={databaseMessages.size} value={formattedFileSize(item.size)} />
    </Show>
    <Spacing />
    <WavesList waves={waves} databaseName={item.name} />
  </>
);

export default DatabaseShow;
