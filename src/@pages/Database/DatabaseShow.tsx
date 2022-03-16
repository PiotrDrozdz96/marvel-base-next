import routes from 'config/routes';
import Database from 'types/Database';
import { Wave } from 'types/Wave';
import { Serie } from 'types/Serie';
import { Volume } from 'types/Volume';
import Show from '@components/Show';
import TextField from '@components/TextField';
import Spacing from '@components/Spacing';
import WavesList from '@pages/Waves/WavesList';
import SeriesList from '@pages/Series/SeriesList';
import VolumesGlobalList from '@pages/Volumes/VolumesGlobalList';
import { interpolate } from 'utils/interpolate';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from './Database.messages';

type Props = {
  item: Database;
  waves: Wave[];
  series: Serie[];
  volumes: Volume[];
};

const DatabaseShow = ({ item, waves, series, volumes }: Props): JSX.Element => (
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
    <WavesList waves={waves} databaseName={item.name} />
    <Spacing />
    <SeriesList waves={waves} series={series} databaseName={item.name} />
    <Spacing />
    <VolumesGlobalList volumes={volumes} databaseName={item.name} />
  </>
);

export default DatabaseShow;
