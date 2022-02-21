import SelectOption from 'types/SelectOption';

import MenuForm from './MenuForm';

type Props = {
  menu: { id: number; name: string }[];
};

const MenuFormContainer = ({ menu }: Props): JSX.Element => {
  const menuOptions: SelectOption[] = menu.map(({ id, name }) => ({ value: `${id}`, label: name }));

  return <MenuForm menuOptions={menuOptions} />;
};

export default MenuFormContainer;
