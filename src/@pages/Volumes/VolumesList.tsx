import routes from 'config/routes';
import { Volume } from 'types/Volume';
import { ListWrapper, DroppableList } from '@components/List';

import volumesMessages from './Volumes.messages';
import { getRows } from './VolumesList.utils';

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

const VolumesList = ({ volumes, databaseName, serieId }: Props): JSX.Element => (
  <ListWrapper
    name={volumesMessages.listName}
    addHref={{ pathname: routes.volumes.id.href, query: { databaseName, id: 'create', serie_id: serieId } }}
  >
    <DroppableList
      initialItems={volumes}
      databaseName={`db/${databaseName}/volumes`}
      itemsName="volumes"
      labels={labels}
      rows={getRows(volumes, databaseName)}
    />
  </ListWrapper>
);

export default VolumesList;
