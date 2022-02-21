import { useRouter } from 'next/router';
import { ApiMenuItem } from 'types/Menu';
import SelectOption from 'types/SelectOption';

import MenuForm from './MenuForm';

type Props = {
  menu: { id: number; name: string }[];
};

const MenuFormContainer = ({ menu }: Props): JSX.Element => {
  const router = useRouter();
  const menuOptions: SelectOption[] = menu.map(({ id, name }) => ({ value: `${id}`, label: name }));

  const onSubmit = async (values: ApiMenuItem) => {
    // eslint-disable-next-line compat/compat
    await fetch('/api/add/menu', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    router.back();
  };

  return <MenuForm menuOptions={menuOptions} onSubmit={onSubmit} />;
};

export default MenuFormContainer;
