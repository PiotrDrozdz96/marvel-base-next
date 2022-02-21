import { MenuItem } from 'types/Menu';
import MenuList from '@pages/Menu/MenuList';

type Props = {
  menu: MenuItem[];
};

const Settings = ({ menu }: Props): JSX.Element => <MenuList menu={menu} />;

export default Settings;
