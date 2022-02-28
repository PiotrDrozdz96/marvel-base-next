import routes from 'config/routes';
import { Volume } from 'types/Volume';
import List from '@components/List';
import ActionsButtons from '@components/ActionsButtons';

import volumesMessages from './Volumes.messages';

type Props = {
  volumes: Volume[];
  databaseName: string;
  serieId: number;
};

const labels: string[] = [
  volumesMessages.id,
  volumesMessages.title,
  volumesMessages.subtitle,
  volumesMessages.image_url,
  volumesMessages.date,
  volumesMessages.order,
  '',
];

const VolumesList = ({ volumes, databaseName, serieId }: Props): JSX.Element => (
  <List
    name={volumesMessages.listName}
    addHref={{ pathname: routes.volumes.id.href, query: { databaseName, id: 'create', serie_id: serieId } }}
    addHrefAs={{ pathname: `db/${databaseName}/volumes/create` }}
    labels={labels}
  >
    {volumes.map((volume) => (
      <tr key={volume.id}>
        <td>{volume.id}</td>
        <td>{volume.title}</td>
        <td>{volume.subtitle}</td>
        <td>{volume.image_url}</td>
        <td>{volume.date}</td>
        <td>{volume.order}</td>
        <ActionsButtons
          routeItem={routes.volumes}
          id={volume.id}
          databaseName={`db/${databaseName}/volumes`}
          query={{ databaseName, id: volume.id }}
          withoutShow
        />
      </tr>
    ))}
  </List>
);

export default VolumesList;
