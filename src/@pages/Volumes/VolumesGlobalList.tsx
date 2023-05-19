import { Volume } from 'types/Volume';
import { ListWrapper, DroppableList } from '@components/List';

import volumesMessages from './Volumes.messages';
import { getRows } from './VolumesList.utils';

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

const VolumesGlobalList = ({ volumes, databaseName }: Props): JSX.Element => (
  <ListWrapper
    name={volumesMessages.listName}
    // todo
    // actions={
    //   <ActionButton
    //     variant="sortByDate"
    //     onClick={() => reorder(items.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date))))}
    //   />
    // }
  >
    <DroppableList
      initialItems={volumes}
      databaseName={`db/${databaseName}/volumes`}
      field="global_order"
      labels={labels}
      rows={getRows(volumes, databaseName)}
    />
  </ListWrapper>
);

export default VolumesGlobalList;
