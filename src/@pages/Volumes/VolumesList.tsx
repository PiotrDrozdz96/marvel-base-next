'use client';

import routes from 'config/routes';
import { Volume } from 'types/Volume';
import List from '@components/List';
import ListRow from '@components/ListRow';
import Image from '@components/Image';
import ActionsButtons from '@components/ActionsButtons';
import useDraggableItems from 'hooks/useDraggableItems';
import width from 'utils/width';

import dateFormat from 'utils/dateFormat';

import volumesMessages from './Volumes.messages';

type Props = {
  volumes: Volume[];
  databaseName: string;
  serieId: number;
};

const labels: string[] = [
  volumesMessages.id,
  volumesMessages.image_url,
  volumesMessages.title,
  volumesMessages.subtitle,
  volumesMessages.date,
  '',
];

const VolumesList = ({ volumes, databaseName, serieId }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(volumes, `db/${databaseName}/volumes`);

  return (
    <List
      name={volumesMessages.listName}
      addHref={{ pathname: routes.volumes.id.href, query: { databaseName, id: 'create', serie_id: serieId } }}
      labels={labels}
      onDragEnd={onDragEnd}
    >
      {items.map((volume, index) => (
        <ListRow key={volume.id} {...getRowProps(volume, index)}>
          <td style={width(100)}>{volume.id}</td>
          <td style={width(100)}>
            <Image src={volume.image_url} alt={volume.title} preset="mini" withLink />
          </td>
          <td style={width('33%')}>{volume.title}</td>
          <td style={width('66%')}>{volume.subtitle}</td>
          <td style={width(200)}>{dateFormat(volume.date)}</td>
          <ActionsButtons
            routeItem={routes.volumes}
            id={volume.id}
            databaseName={`db/${databaseName}/volumes`}
            query={{ databaseName, id: volume.id }}
          />
        </ListRow>
      ))}
    </List>
  );
};

export default VolumesList;
