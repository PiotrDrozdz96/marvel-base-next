'use client';

import { useRouter } from 'next/router';
import { UrlObject } from 'url';

import ActionButton from '@components/ActionButton';
import width from 'utils/width';

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
  withoutEdit?: boolean;
};

const ActionsButtons = ({ routeItem, id, databaseName, query, withoutShow, withoutEdit }: Props): JSX.Element => {
  const router = useRouter();

  const onDelete = async () => {
    await fetch(`/api/${databaseName}/${id}`, {
      method: 'DELETE',
    });
    router.replace(router.asPath);
  };

  const actionsLength = 1 + Number(!withoutShow) + Number(!withoutEdit);

  return (
    <td style={width(90 * actionsLength)}>
      <div className={classes.actionsButtons}>
        {!withoutShow && (
          <ActionButton variant="show" href={{ pathname: routeItem.id.show.href, query: query || { id } }} />
        )}
        {!withoutEdit && <ActionButton variant="edit" href={{ pathname: routeItem.id.href, query: query || { id } }} />}
        <ActionButton variant="delete" itemName={`#${id}`} onDelete={onDelete} />
      </div>
    </td>
  );
};

export default ActionsButtons;
