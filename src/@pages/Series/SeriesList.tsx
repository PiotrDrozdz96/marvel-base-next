import routes from 'config/routes';
import { Serie } from 'types/Serie';
import List from '@components/List';
import ActionsButtons from '@components/ActionsButtons';

import seriesMessages from './Series.messages';

type Props = {
  series: Serie[];
  databaseName: string;
};

const labels: string[] = [seriesMessages.id, seriesMessages.name, seriesMessages.waveId, seriesMessages.order, ''];

const SeriesList = ({ series, databaseName }: Props): JSX.Element => (
  <List
    name={seriesMessages.listName}
    addHref={{ pathname: routes.series.id.href, query: { databaseName, id: 'create' } }}
    labels={labels}
  >
    {series.map((serie) => (
      <tr key={serie.id}>
        <td>{serie.id}</td>
        <td>{serie.name}</td>
        <td>{serie.waveId}</td>
        <td>{serie.order}</td>
        <ActionsButtons
          routeItem={routes.series}
          id={serie.id}
          databaseName={`db/${databaseName}/series`}
          query={{ databaseName, id: serie.id }}
          withoutShow
        />
      </tr>
    ))}
  </List>
);

export default SeriesList;
