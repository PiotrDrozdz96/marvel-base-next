import routes from 'config/routes';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import { Serie } from 'types/Serie';
import Show from '@components/Show';
import TextField from '@components/TextField';
import Spacing from '@components/Spacing';
import WavesList from '@pages/Waves/WavesList';
import SeriesList from '@pages/Series/SeriesList';
import { interpolate } from 'utils/interpolate';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from './Database.messages';

type Props = {
  item: Database;
  waves: Wave[];
  series: Serie[];
};

const DatabaseShow = ({ item, waves, series }: Props): JSX.Element => (
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
    <Spacing />
    <SeriesList waves={waves} series={series} databaseName={item.name} />
  </>
);

export default DatabaseShow;
