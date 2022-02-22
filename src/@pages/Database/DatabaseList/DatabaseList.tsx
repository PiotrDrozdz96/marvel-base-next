import Database from 'types/Database';

import Container from '@components/Container';
import List from '@components/List';
import Toolbar from '@components/Toolbar';
import formattedFileSize from 'utils/formattedFileSize';

import databaseMessages from '../Database.messages';

type Props = {
  databases: Database[];
  className?: string;
};

const DatabaseList = ({ databases, className }: Props): JSX.Element => {
  console.log('siema');

  return (
    <Container className={className}>
      <Toolbar name={databaseMessages.listName} />
      <List labels={[databaseMessages.name, databaseMessages.size]}>
        {databases.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{formattedFileSize(item.size)}</td>
          </tr>
        ))}
      </List>
    </Container>
  );
};

export default DatabaseList;
