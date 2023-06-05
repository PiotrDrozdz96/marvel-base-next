import { UrlObject } from 'url';

import Resource from 'types/Resource';
import ActionButton from '@components/ActionButton';
import DeleteButton from '@components/DeleteButton';
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
  resource: Resource;
  databaseName?: string;
  query?: UrlObject['query'];
  withoutShow?: boolean;
  withoutEdit?: boolean;
};

const ActionsButtons = ({
  routeItem,
  id,
  resource,
  databaseName,
  query,
  withoutShow,
  withoutEdit,
}: Props): JSX.Element => {
  const actionsLength = 1 + Number(!withoutShow) + Number(!withoutEdit);

  return (
    <td style={width(90 * actionsLength)}>
      <div className={classes.actionsButtons}>
        {!withoutShow && (
          <ActionButton variant="show" href={{ pathname: routeItem.id.show.href, query: query || { id } }} />
        )}
        {!withoutEdit && <ActionButton variant="edit" href={{ pathname: routeItem.id.href, query: query || { id } }} />}
        <DeleteButton resource={resource} id={id} databaseName={databaseName} />
      </div>
    </td>
  );
};

export default ActionsButtons;
