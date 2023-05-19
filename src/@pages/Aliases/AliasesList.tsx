import { Alias } from 'types/Alias';
import routes from 'config/routes';
import { ListWrapper, ListTable } from '@components/List';
import ActionsButtons from '@components/ActionsButtons';

import databaseMessages from './Aliases.messages';

type Props = {
  aliases: Alias[];
  databaseName: string;
};

const AliasesList = ({ aliases, databaseName }: Props): JSX.Element => (
  <ListWrapper
    name={databaseMessages.listName}
    addHref={{ pathname: routes.aliases.create.href, query: { databaseName } }}
  >
    <ListTable labels={[databaseMessages.name, databaseMessages.params, '']}>
      {aliases.map((item) => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.params}</td>
          <ActionsButtons
            routeItem={routes.db}
            id={item.name}
            resource="aliases"
            databaseName={databaseName}
            query={{ databaseName, id: item.name }}
            withoutShow
            withoutEdit
          />
        </tr>
      ))}
    </ListTable>
  </ListWrapper>
);

export default AliasesList;
