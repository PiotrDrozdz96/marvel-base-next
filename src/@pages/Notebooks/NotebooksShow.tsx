import routes from 'config/routes';
import { FrontNotebook } from 'types/Notebook';
import ShowWithImage from '@components/ShowWithImage';
import TextField from '@components/TextField';
import { interpolate } from 'utils/interpolate';
import dateFormat from 'utils/dateFormat';

import notebooksMessages from './Notebooks.messages';

type Props = {
  item: FrontNotebook;
  databaseName: string;
};

const NotebooksShow = ({ item, databaseName }: Props): JSX.Element => (
  <>
    <ShowWithImage
      name={interpolate(notebooksMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.notebooks.id.href, query: { id: item.id, databaseName } }}
      imageUrl={item.image_url}
      alt={`${item.title} ${item.subtitle}`.trim()}
    >
      <TextField label={notebooksMessages.title} value={item.title} />
      <TextField label={notebooksMessages.subtitle} value={item.subtitle} />
      <TextField label={notebooksMessages.vol} value={item.vol} />
      <TextField label={notebooksMessages.no} value={item.no} />
      <TextField label={notebooksMessages.date} value={dateFormat(item.date)} />
      <TextField label={notebooksMessages.serie_id} value={item.serieName} />
    </ShowWithImage>
  </>
);

export default NotebooksShow;
