import Database from 'types/Database';
import routes from 'config/routes';
import { ListWrapper, ListTable } from '@components/List';
import ActionsButtons from '@components/ActionsButtons';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from './Database.messages';

type Props = {
  databases: Database[];
};

const DatabaseList = ({ databases }: Props): JSX.Element => (
  <ListWrapper
    name={databaseMessages.listName}
    addHref={{ pathname: routes.db.id.href, query: { databaseName: 'create' } }}
  >
    <ListTable labels={[databaseMessages.name, databaseMessages.size, '']}>
      {databases.map((item) => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{formattedFileSize(item.size)}</td>
          <ActionsButtons
            resource="db"
            routeItem={routes.db}
            databaseName={item.name}
            id={item.name}
            query={{ databaseName: item.name }}
          />
        </tr>
      ))}
    </ListTable>
  </ListWrapper>
);

export default DatabaseList;
