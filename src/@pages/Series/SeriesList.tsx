import { ReactNode } from 'react';

import routes from 'config/routes';
import { Serie } from 'types/Serie';
import { ListWrapper, DroppableList } from '@components/List';
import ActionsButtons from '@components/ActionsButtons';
import BooleanField from '@components/BooleanField';
import width from 'utils/width';

import seriesMessages from './Series.messages';

type Props = {
  series: Serie[];
  databaseName: string;
  waveId: number;
};

const labels: string[] = [seriesMessages.id, seriesMessages.name, seriesMessages.isFilter, ''];

const getRows = (series: Serie[], databaseName: string) => {
  const rows: Record<number, ReactNode> = {};

  series.forEach((serie) => {
    rows[serie.id] = (
      <>
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
      </>
    );
  });

  return rows;
};

const SeriesList = ({ series, databaseName, waveId }: Props): JSX.Element => (
  <ListWrapper
    name={seriesMessages.listName}
    addHref={{ pathname: routes.series.id.href, query: { databaseName, id: 'create', wave_id: waveId } }}
  >
    <DroppableList
      initialItems={series}
      databaseName={`db/${databaseName}/series`}
      labels={labels}
      rows={getRows(series, databaseName)}
    />
  </ListWrapper>
);

export default SeriesList;
