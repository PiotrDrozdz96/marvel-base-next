import { MenuItem } from 'types/Menu';
import Database from 'types/Database';
import MenuList from '@pages/Menu/MenuList';
import DatabaseList from '@pages/Database/DatabaseList';

import classes from './Settings.module.scss';

type Props = {
  menu: MenuItem[];
  databases: Database[];
};

const Settings = ({ menu, databases }: Props): JSX.Element => (
  <>
    <MenuList menu={menu} query={{ type: 'MAIN_MENU' }} />
    <DatabaseList className={classes.spacing} databases={databases} />
  </>
);

export default Settings;
