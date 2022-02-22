import { useRouter } from 'next/router';

import routes from 'config/routes';
import FormPartial from 'types/FormPartial';
import { ApiMenuItem } from 'types/Menu';
import SelectOption from 'types/SelectOption';
import Toolbar from '@components/Toolbar';
import Container from '@components/Container';
import ActionButton from '@components/ActionButton';
import { interpolate } from 'utils/interpolate';

import menuMessages from '../Menu.messages';
import MenuForm from './MenuForm';

type Props = {
  menu: { id: number; name: string }[];
  initialValues: FormPartial<ApiMenuItem>;
  variant: 'create' | 'edit';
  itemId?: number;
};

const MenuFormContainer = ({ menu, initialValues, variant, itemId }: Props): JSX.Element => {
  const router = useRouter();
  const menuOptions: SelectOption[] = menu.map(({ id, name }) => ({ value: `${id}`, label: name }));

  const onSubmit = async (values: FormPartial<ApiMenuItem>) => {
    await fetch(variant === 'create' ? '/api/add/menu' : `/api/edit/menu/${itemId}`, {
      method: 'POST',
      body: JSON.stringify(values),
    });
    router.back();
  };

  return (
    <Container>
      <Toolbar
        name={variant === 'create' ? menuMessages.createName : interpolate(menuMessages.editName, { id: itemId })}
      >
        {variant === 'edit' && (
          <ActionButton variant="show" href={{ pathname: routes.menu.id.show.href, query: { id: itemId } }} />
        )}
      </Toolbar>
      <MenuForm menuOptions={menuOptions} initialValues={initialValues} onSubmit={onSubmit} />
    </Container>
  );
};

export default MenuFormContainer;
