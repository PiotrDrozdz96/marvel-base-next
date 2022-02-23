import routes from 'config/routes';
import { Wave } from 'types/Wave';
import List from '@components/List';
import ActionsButtons from '@components/ActionsButtons';

import wavesMessages from './Waves.messages';

type Props = {
  waves: Wave[];
  databaseName: string;
};

const labels: string[] = [wavesMessages.id, wavesMessages.name, wavesMessages.order, ''];

const WavesList = ({ waves, databaseName }: Props): JSX.Element => (
  <List
    name={wavesMessages.listName}
    addHref={{ pathname: routes.waves.id.href, query: { databaseName, id: 'create' } }}
    labels={labels}
  >
    {waves.map((wave) => (
      <tr key={wave.id}>
        <td>{wave.id}</td>
        <td>{wave.name}</td>
        <td>{wave.order}</td>
        <ActionsButtons
          routeItem={routes.waves}
          id={wave.id}
          databaseName={`db/${databaseName}/waves`}
          query={{ databaseName, id: wave.id }}
          withoutShow
        />
      </tr>
    ))}
  </List>
);

export default WavesList;
