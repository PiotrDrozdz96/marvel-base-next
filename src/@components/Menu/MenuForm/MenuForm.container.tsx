import { useRouter } from 'next/router';
import FormPartial from 'types/FormPartial';
import { ApiMenuItem } from 'types/Menu';
import SelectOption from 'types/SelectOption';

import MenuForm from './MenuForm';

type Props = {
  menu: { id: number; name: string }[];
  initialValues: FormPartial<ApiMenuItem>;
};

const MenuFormContainer = ({ menu, initialValues }: Props): JSX.Element => {
  const router = useRouter();
  const menuOptions: SelectOption[] = menu.map(({ id, name }) => ({ value: `${id}`, label: name }));

  const onSubmit = async (values: FormPartial<ApiMenuItem>) => {
    // eslint-disable-next-line compat/compat
    await fetch('/api/add/menu', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    router.back();
  };

  return <MenuForm menuOptions={menuOptions} initialValues={initialValues} onSubmit={onSubmit} />;
};

export default MenuFormContainer;
