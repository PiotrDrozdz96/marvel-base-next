import Image from '@components/Image';
import dateFormat from 'utils/dateFormat';

import classes from './Book.module.scss';

type Props = {
  title: string;
  subtitle?: string;
  vol?: string;
  no?: string;
  image_url: string;
  date: string;
  priority?: boolean;
};

const Book = ({ title, subtitle, vol, no, image_url: imageUrl, date, priority }: Props): JSX.Element => (
  <div className={classes.book}>
    <Image preset="thumb" alt={`${title} ${subtitle}`.trim()} src={imageUrl} priority={priority} />
    <div className={classes.title}>{title}</div>
    {!!vol && !!no && <div>{`Vol ${vol} #${no}`}</div>}
    {!!subtitle && <div className={classes.subtitle}>{subtitle}</div>}
    <div>{dateFormat(date)}</div>
  </div>
);

export default Book;
