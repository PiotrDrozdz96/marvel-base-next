import routes from 'config/routes';
import { FrontSerie } from 'types/Serie';
import { Volume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import VolumesList from '@pages/Volumes/VolumesList';
import NotebooksList from '@pages/Notebooks/NotebooksList';
import Show from '@components/Show';
import TextField from '@components/TextField';
import Spacing from '@components/Spacing';
import BooleanField from '@components/BooleanField';
import { interpolate } from 'utils/interpolate';

import seriesMessages from './Series.messages';

type Props = {
  item: FrontSerie;
  volumes: Volume[];
  notebooks: Notebook[];
  databaseName: string;
};

const SeriesShow = ({ item, volumes, notebooks, databaseName }: Props): JSX.Element => (
  <>
    <Show
      name={interpolate(seriesMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.series.id.href, query: { id: item.id, databaseName } }}
      backHref={{ pathname: routes.db.id.show.href, query: { databaseName } }}
    >
      <TextField label={seriesMessages.id} value={item.id} />
      <TextField label={seriesMessages.name} value={item.name} />
      <TextField label={seriesMessages.waveId} value={item.waveName} />
      <TextField label={seriesMessages.isFilter} value={<BooleanField value={item.is_filter} />} />
    </Show>
    <Spacing />
    {(item.is_filter || !!volumes.length) && (
      <VolumesList volumes={volumes} databaseName={databaseName} serieId={item.id} />
    )}
    <Spacing />
    <NotebooksList notebooks={notebooks} databaseName={databaseName} serieId={item.id} />
  </>
);

export default SeriesShow;
