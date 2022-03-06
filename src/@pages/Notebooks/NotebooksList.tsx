import routes from 'config/routes';
import { Notebook } from 'types/Notebook';
import List from '@components/List';
import ListRow from '@components/ListRow';
import Image from '@components/Image';
import ActionsButtons from '@components/ActionsButtons';
import useDraggableItems from 'hooks/useDraggableItems';
import width from 'utils/width';

import dateFormat from 'utils/dateFormat';

import notebooksMessages from './Notebooks.messages';

type Props = {
  notebooks: Notebook[];
  databaseName: string;
  serieId: number;
};

const labels: string[] = [
  notebooksMessages.id,
  notebooksMessages.image_url,
  notebooksMessages.title,
  notebooksMessages.vol,
  notebooksMessages.no,
  notebooksMessages.subtitle,
  notebooksMessages.date,
  '',
];

const NotebooksList = ({ notebooks, databaseName, serieId }: Props): JSX.Element => {
  const { items, onDragEnd, getRowProps } = useDraggableItems(notebooks, `db/${databaseName}/notebooks`);

  return (
    <List
      name={notebooksMessages.listName}
      addHref={{ pathname: routes.notebooks.id.href, query: { databaseName, id: 'create', serie_id: serieId } }}
      addHrefAs={{ pathname: `/db/${databaseName}/notebooks/create` }}
      labels={labels}
      onDragEnd={onDragEnd}
    >
      {items.map((notebook, index) => (
        <ListRow key={notebook.id} {...getRowProps(notebook, index)}>
          <td style={width(100)}>{notebook.id}</td>
          <td style={width(100)}>
            <Image src={notebook.image_url} alt={notebook.title} preset="mini" withLink />
          </td>
          <td style={width('33%')}>{notebook.title}</td>
          <td style={width(100)}>{notebook.vol}</td>
          <td style={width(100)}>{notebook.no}</td>
          <td style={width('66%')}>{notebook.subtitle}</td>
          <td style={width(200)}>{dateFormat(notebook.date)}</td>
          <ActionsButtons
            routeItem={routes.notebooks}
            id={notebook.id}
            databaseName={`db/${databaseName}/notebooks`}
            query={{ databaseName, id: notebook.id }}
          />
        </ListRow>
      ))}
    </List>
  );
};

export default NotebooksList;
