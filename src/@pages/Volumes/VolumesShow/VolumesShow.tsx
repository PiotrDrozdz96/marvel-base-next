import routes from 'config/routes';
import { FrontVolume } from 'types/Volume';
import { Notebook } from 'types/Notebook';
import ShowWithImage from '@components/ShowWithImage';
import TextField from '@components/TextField';
import Book from '@components/Book';
import Link from '@components/Link';
import { interpolate } from 'utils/interpolate';
import dateFormat from 'utils/dateFormat';

import volumesMessages from '../Volumes.messages';
import classes from './VolumesShow.module.scss';

type Props = {
  item: FrontVolume;
  databaseName: string;
  notebooks: Notebook[];
};

const VolumesShow = ({ item, databaseName, notebooks }: Props): JSX.Element => (
  <>
    <ShowWithImage
      name={interpolate(volumesMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.volumes.id.href, query: { id: item.id, databaseName } }}
      backHref={{ pathname: routes.series.id.show.href, query: { id: item.serie_id, databaseName } }}
      imageUrl={item.image_url}
      alt={`${item.title} ${item.subtitle}`.trim()}
    >
      <TextField label={volumesMessages.title} value={item.title} />
      <TextField label={volumesMessages.subtitle} value={item.subtitle} />
      <TextField label={volumesMessages.date} value={dateFormat(item.date)} />
      <TextField label={volumesMessages.serie_id} value={item.serieName} />
      <TextField
        label={volumesMessages.notebooks}
        value={
          <div className={classes.content}>
            {notebooks.map((notebook) => (
              <Link
                key={notebook.id}
                className={classes.previewElement}
                href={{ pathname: routes.notebooks.id.show.href, query: { databaseName, id: notebook.id } }}
              >
                <Book {...notebook} />
              </Link>
            ))}
          </div>
        }
      />
    </ShowWithImage>
  </>
);

export default VolumesShow;
