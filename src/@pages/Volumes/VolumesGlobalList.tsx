import routes from 'config/routes';
import { Volume } from 'types/Volume';
import List from '@components/List';
import ListRow from '@components/ListRow';
import Image from '@components/Image';
import ActionsButtons from '@components/ActionsButtons';
import ActionButton from '@components/ActionButton';
import useDraggableItems from 'hooks/useDraggableItems';
import width from 'utils/width';
import dateFormat from 'utils/dateFormat';

import volumesMessages from './Volumes.messages';

type Props = {
  volumes: Volume[];
  databaseName: string;
};

const labels: string[] = [
  volumesMessages.id,
  volumesMessages.image_url,
  volumesMessages.title,
  volumesMessages.subtitle,
  volumesMessages.date,
  '',
];

const VolumesGlobalList = ({ volumes, databaseName }: Props): JSX.Element => {
  const { items, onDragEnd, reorder, getRowProps } = useDraggableItems(
    volumes,
    `db/${databaseName}/volumes`,
    'global_order'
  );

  return (
    <List
      name={volumesMessages.listName}
      labels={labels}
      actions={
        <ActionButton
          variant="sortByDate"
          onClick={() => reorder(items.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date))))}
        />
      }
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

export default VolumesGlobalList;
