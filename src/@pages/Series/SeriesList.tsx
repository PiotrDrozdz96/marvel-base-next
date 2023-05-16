'use client';

import routes from 'config/routes';
import { Serie } from 'types/Serie';
import List from '@components/List';
import ListRow from '@components/ListRow';
import ActionsButtons from '@components/ActionsButtons';
import BooleanField from '@components/BooleanField';
import useDraggableItems from 'hooks/useDraggableItems';
import width from 'utils/width';

import seriesMessages from './Series.messages';

type Props = {
  series: Serie[];
  databaseName: string;
  waveId: number;
};

const labels: string[] = [seriesMessages.id, seriesMessages.name, seriesMessages.isFilter, ''];

const SeriesList = ({ series, databaseName, waveId }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(series, `db/${databaseName}/series`);

  return (
    <List
      name={seriesMessages.listName}
      addHref={{ pathname: routes.series.id.href, query: { databaseName, id: 'create', wave_id: waveId } }}
      labels={labels}
      onDragEnd={onDragEnd}
    >
      {items.map((serie, index) => (
        <ListRow key={serie.id} {...getRowProps(serie, index)}>
          <td style={width(100)}>{serie.id}</td>
          <td style={width('100%')}>{serie.name}</td>
          <td style={width(100)}>
            <BooleanField value={serie.is_filter} />
          </td>
          <ActionsButtons
            routeItem={routes.series}
            id={serie.id}
            resource="series"
            databaseName={databaseName}
            query={{ databaseName, id: serie.id }}
          />
        </ListRow>
      ))}
    </List>
  );
};

export default SeriesList;
