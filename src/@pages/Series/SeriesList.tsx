import routes from 'config/routes';
import { Serie } from 'types/Serie';
import { Wave } from 'types/Wave';
import List from '@components/List';
import ListRow from '@components/ListRow';
import ActionsButtons from '@components/ActionsButtons';
import useDraggableItems from 'hooks/useDraggableItems';
import width from 'utils/width';

import seriesMessages from './Series.messages';

type Props = {
  series: Serie[];
  waves: Wave[];
  databaseName: string;
};

const labels: string[] = [seriesMessages.id, seriesMessages.name, seriesMessages.waveId, ''];

const SeriesList = ({ series, waves, databaseName }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(series, `db/${databaseName}/series`);

  return (
    <List
      name={seriesMessages.listName}
      addHref={{ pathname: routes.series.id.href, query: { databaseName, id: 'create' } }}
      labels={labels}
      onDragEnd={onDragEnd}
    >
      {items.map((serie, index) => (
        <ListRow key={serie.id} {...getRowProps(serie, index)}>
          <td style={width(100)}>{serie.id}</td>
          <td style={width('50%')}>{serie.name}</td>
          <td style={width('50%')}>{waves.find((wave) => Number(wave.id) === serie.wave_id)?.name}</td>
          <ActionsButtons
            routeItem={routes.series}
            id={serie.id}
            databaseName={`db/${databaseName}/series`}
            query={{ databaseName, id: serie.id }}
          />
        </ListRow>
      ))}
    </List>
  );
};

export default SeriesList;
