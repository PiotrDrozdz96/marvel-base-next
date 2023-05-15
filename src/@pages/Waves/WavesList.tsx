'use client';

import routes from 'config/routes';
import { Wave } from 'types/Wave';
import List from '@components/List';
import ListRow from '@components/ListRow';
import ActionsButtons from '@components/ActionsButtons';
import useDraggableItems from 'hooks/useDraggableItems';
import width from 'utils/width';

import wavesMessages from './Waves.messages';

type Props = {
  waves: Wave[];
  databaseName: string;
};

const labels: string[] = [wavesMessages.id, wavesMessages.name, ''];

const WavesList = ({ waves, databaseName }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(waves, `db/${databaseName}/waves`);

  return (
    <List
      name={wavesMessages.listName}
      addHref={{ pathname: routes.waves.id.href, query: { databaseName, id: 'create' } }}
      labels={labels}
      onDragEnd={onDragEnd}
    >
      {items.map((wave, index) => (
        <ListRow key={wave.id} {...getRowProps(wave, index)}>
          <td style={width(100)}>{wave.id}</td>
          <td style={width('100%')}>{wave.name}</td>
          <ActionsButtons
            routeItem={routes.waves}
            id={wave.id}
            databaseName={`db/${databaseName}/waves`}
            query={{ databaseName, id: wave.id }}
          />
        </ListRow>
      ))}
    </List>
  );
};

export default WavesList;
