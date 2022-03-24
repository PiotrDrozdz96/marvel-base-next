import routes from 'config/routes';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import { Volume } from 'types/Volume';
import { Alias } from 'types/Alias';
import Show from '@components/Show';
import TextField from '@components/TextField';
import Spacing from '@components/Spacing';
import WavesList from '@pages/Waves/WavesList';
import VolumesGlobalList from '@pages/Volumes/VolumesGlobalList';
import AliasesList from '@pages/Aliases/AliasesList';
import { interpolate } from 'utils/interpolate';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from './Database.messages';

type Props = {
  item: Database;
  waves: Wave[];
  volumes: Volume[];
  aliases: Alias[];
};

const DatabaseShow = ({ item, waves, volumes, aliases }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(databaseMessages.itemName, { id: item.name })}
      editHref={{ pathname: routes.db.id.href, query: { databaseName: item.name } }}
      backHref={{ pathname: routes.settings.href }}
    >
      <TextField label={databaseMessages.name} value={item.name} />
      <TextField label={databaseMessages.size} value={formattedFileSize(item.size)} />
    </Show>
    <Spacing />
    <AliasesList databaseName={item.name} aliases={aliases} />
    <Spacing />
    <WavesList waves={waves} databaseName={item.name} />
    <Spacing />
    <VolumesGlobalList volumes={volumes} databaseName={item.name} />
  </>
);

export default DatabaseShow;
