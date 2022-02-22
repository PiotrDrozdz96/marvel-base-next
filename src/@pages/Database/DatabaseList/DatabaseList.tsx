import Database from 'types/Database';
import routes from 'config/routes';
import Container from '@components/Container';
import List from '@components/List';
import Toolbar from '@components/Toolbar';
import ActionButton from '@components/ActionButton';
import ActionsButtons from '@components/ActionsButtons';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from '../Database.messages';

type Props = {
  databases: Database[];
  className?: string;
};

const DatabaseList = ({ databases, className }: Props): JSX.Element => (
  <Container className={className}>
    <Toolbar name={databaseMessages.listName}>
      <ActionButton variant="add" href={{ pathname: routes.db.id.href, query: { id: 'create' } }} />
    </Toolbar>
    <List labels={[databaseMessages.name, databaseMessages.size, '']}>
      {databases.map((item) => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{formattedFileSize(item.size)}</td>
          <ActionsButtons routeItem={routes.db} id={item.name} databaseName="db" />
        </tr>
      ))}
    </List>
  </Container>
);

export default DatabaseList;
