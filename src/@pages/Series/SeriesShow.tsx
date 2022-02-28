import routes from 'config/routes';
import { FrontSerie } from 'types/Serie';
import { Volume } from 'types/Volume';
import VolumesList from '@pages/Volumes/VolumesList';
import Show from '@components/Show';
import TextField from '@components/TextField';
import Spacing from '@components/Spacing';
import { interpolate } from 'utils/interpolate';

import seriesMessages from './Series.messages';

type Props = {
  item: FrontSerie;
  volumes: Volume[];
  databaseName: string;
};

const SeriesShow = ({ item, volumes, databaseName }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(seriesMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.series.id.href, query: { id: item.id, databaseName } }}
    >
      <TextField label={seriesMessages.id} value={item.id} />
      <TextField label={seriesMessages.name} value={item.name} />
      <TextField label={seriesMessages.waveId} value={item.waveName} />
    </Show>
    <Spacing />
    <VolumesList volumes={volumes} databaseName={databaseName} serieId={item.id} />
  </>
);

export default SeriesShow;
