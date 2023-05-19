'use client';

import routes from 'config/routes';
import { Wave } from 'types/Wave';
import { ListWrapper, DroppableList } from '@components/List';
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
    <ListWrapper
      name={wavesMessages.listName}
      addHref={{ pathname: routes.waves.id.href, query: { databaseName, id: 'create' } }}
    >
      <DroppableList labels={labels} onDragEnd={onDragEnd}>
        {items.map((wave, index) => (
          <ListRow key={wave.id} {...getRowProps(wave, index)}>
            <td style={width(100)}>{wave.id}</td>
            <td style={width('100%')}>{wave.name}</td>
            <ActionsButtons
              routeItem={routes.waves}
              id={wave.id}
              resource="waves"
              databaseName={databaseName}
              query={{ databaseName, id: wave.id }}
            />
          </ListRow>
        ))}
      </DroppableList>
    </ListWrapper>
  );
};

export default WavesList;
