import Database from 'types/Database';
import routes from 'config/routes';
import List from '@components/List';
import ActionsButtons from '@components/ActionsButtons';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from './Database.messages';

type Props = {
  databases: Database[];
};

const DatabaseList = ({ databases }: Props): JSX.Element => (
  <List
    name={databaseMessages.listName}
    addHref={{ pathname: routes.db.id.href, query: { databaseName: 'create' } }}
    labels={[databaseMessages.name, databaseMessages.size, '']}
    onDragEnd={() => {}}
  >
    {databases.map((item) => (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{formattedFileSize(item.size)}</td>
        <ActionsButtons routeItem={routes.db} id={item.name} databaseName="db" query={{ databaseName: item.name }} />
      </tr>
    ))}
  </List>
);

export default DatabaseList;
