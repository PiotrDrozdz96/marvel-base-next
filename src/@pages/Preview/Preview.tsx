import { Volume } from 'types/Volume';
import routes from 'config/routes';
import Link from '@components/Link';
import Book from '@components/Book';

import classes from './Preview.module.scss';

type Props = {
  volumes: Volume[];
  databaseName: string;
};

const Preview = ({ volumes, databaseName }: Props): JSX.Element => (
  <div className={classes.preview}>
    {volumes.map((volume) => (
      <Link
        key={volume.id}
        className={classes.previewElement}
        href={{ pathname: routes.volumes.id.show.href, query: { databaseName, id: volume.id } }}
      >
        <Book {...volume} />
      </Link>
    ))}
  </div>
);

export default Preview;
