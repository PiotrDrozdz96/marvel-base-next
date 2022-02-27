import { UrlObject } from 'url';

import ActionButton from '@components/ActionButton';
import { useRouter } from 'next/router';

import classes from './ActionsButtons.module.scss';

type RouteItem = {
  id: {
    href: string;
    show: {
      href: string;
    };
  };
};

type Props = {
  routeItem: RouteItem;
  id: number | string;
  databaseName: string;
  query?: UrlObject['query'];
  withoutShow?: boolean;
};

const ActionsButtons = ({ routeItem, id, databaseName, query, withoutShow }: Props): JSX.Element => {
  const router = useRouter();

  const onDelete = async () => {
    await fetch(`/api/${databaseName}/${id}`, {
      method: 'DELETE',
    });
    router.replace(router.asPath);
  };

  return (
    <td style={{ width: withoutShow ? 180 : 270 }}>
      <div className={classes.actionsButtons}>
        {!withoutShow && (
          <ActionButton variant="show" href={{ pathname: routeItem.id.show.href, query: query || { id } }} />
        )}
        <ActionButton variant="edit" href={{ pathname: routeItem.id.href, query: query || { id } }} />
        <ActionButton variant="delete" itemName={`#${id}`} onDelete={onDelete} />
      </div>
    </td>
  );
};

export default ActionsButtons;
