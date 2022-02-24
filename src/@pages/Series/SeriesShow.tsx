import routes from 'config/routes';
import { FrontSerie } from 'types/Serie';
import Show from '@components/Show';
import TextField from '@components/TextField';
import { interpolate } from 'utils/interpolate';

import seriesMessages from './Series.messages';

type Props = {
  item: FrontSerie;
  databaseName: string;
};

const SeriesShow = ({ item, databaseName }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(seriesMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.series.id.href, query: { id: item.id, databaseName } }}
    >
      <TextField label={seriesMessages.id} value={item.id} />
      <TextField label={seriesMessages.name} value={item.name} />
      <TextField label={seriesMessages.waveId} value={item.waveName} />
    </Show>
  </>
);

export default SeriesShow;
