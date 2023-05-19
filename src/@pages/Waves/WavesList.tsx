import { ReactNode } from 'react';

import routes from 'config/routes';
import { Wave } from 'types/Wave';
import { ListWrapper, DroppableList } from '@components/List';
import ActionsButtons from '@components/ActionsButtons';
import width from 'utils/width';

import wavesMessages from './Waves.messages';

type Props = {
  waves: Wave[];
  databaseName: string;
};

const labels: string[] = [wavesMessages.id, wavesMessages.name, ''];

export const getRows = (waves: Wave[], databaseName: string) => {
  const rows: Record<number, ReactNode> = {};

  waves.forEach((wave) => {
    rows[wave.id] = (
      <>
        <td style={width(100)}>{wave.id}</td>
        <td style={width('100%')}>{wave.name}</td>
        <ActionsButtons
          routeItem={routes.waves}
          id={wave.id}
          resource="waves"
          databaseName={databaseName}
          query={{ databaseName, id: wave.id }}
        />
      </>
    );
  });

  return rows;
};

const WavesList = ({ waves, databaseName }: Props): JSX.Element => (
  <ListWrapper
    name={wavesMessages.listName}
    addHref={{ pathname: routes.waves.id.href, query: { databaseName, id: 'create' } }}
  >
    <DroppableList
      initialItems={waves}
      databaseName={`db/${databaseName}/waves`}
      labels={labels}
      rows={getRows(waves, databaseName)}
    />
  </ListWrapper>
);

export default WavesList;
