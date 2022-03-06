import routes from 'config/routes';
import { FrontVolume } from 'types/Volume';
import ShowWithImage from '@components/ShowWithImage';
import TextField from '@components/TextField';
import { interpolate } from 'utils/interpolate';
import dateFormat from 'utils/dateFormat';

import volumesMessages from './Volumes.messages';

type Props = {
  item: FrontVolume;
  databaseName: string;
};

const VolumesShow = ({ item, databaseName }: Props): JSX.Element => (
  <>
    <ShowWithImage
      name={interpolate(volumesMessages.itemName, { id: item.id })}
      editHref={{ pathname: routes.volumes.id.href, query: { id: item.id, databaseName } }}
      imageUrl={item.image_url}
      alt={`${item.title} ${item.subtitle}`.trim()}
    >
      <TextField label={volumesMessages.title} value={item.title} />
      <TextField label={volumesMessages.subtitle} value={item.subtitle} />
      <TextField label={volumesMessages.date} value={dateFormat(item.date)} />
      <TextField label={volumesMessages.serie_id} value={item.serieName} />
    </ShowWithImage>
  </>
);

export default VolumesShow;
