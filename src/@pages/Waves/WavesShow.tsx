import routes from 'config/routes';
import { Wave } from 'types/Wave';
import { Serie } from 'types/Serie';
import Spacing from '@components/Spacing';
import TextField from '@components/TextField';
import Show from '@components/Show';
import SeriesList from '@pages/Series/SeriesList';
import { interpolate } from 'utils/interpolate';

import wavesMessages from './Waves.messages';

type Props = {
  item: Wave;
  series: Serie[];
  databaseName: string;
};

const WavesShow = ({ item, series, databaseName }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(wavesMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.waves.id.href, query: { id: item.id, databaseName } }}
      backHref={{ pathname: routes.db.id.show.href, query: { databaseName } }}
    >
      <TextField label={wavesMessages.id} value={item.id} />
      <TextField label={wavesMessages.name} value={item.name} />
    </Show>
    <Spacing />
    <SeriesList series={series} databaseName={databaseName} waveId={item.id} />
  </>
);

export default WavesShow;
