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
};

const ActionsButtons = ({ routeItem, id, databaseName }: Props): JSX.Element => {
  const router = useRouter();

  const onDelete = async () => {
    await fetch(`/api/delete/${databaseName}/${id}`, {
      method: 'DELETE',
    });
    router.replace(router.asPath);
  };

  return (
    <td style={{ width: 290 }}>
      <div className={classes.actionsButtons}>
        <ActionButton variant="show" href={{ pathname: routeItem.id.show.href, query: { id } }} />
        <ActionButton variant="edit" href={{ pathname: routeItem.id.href, query: { id } }} />
        <ActionButton variant="delete" itemName={`#${id}`} onDelete={onDelete} />
      </div>
    </td>
  );
};

export default ActionsButtons;
