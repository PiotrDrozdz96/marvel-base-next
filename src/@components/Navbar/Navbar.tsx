import { ReactNode } from 'react';
import { IoSettingsSharp, IoHome, IoTvOutline, IoReaderSharp } from 'react-icons/io5';

import { MenuItem } from 'types/Menu';
import routes from 'config/routes';
import Link from '@components/Link';

import classes from './Navbar.module.scss';

type Props = {
  menu: MenuItem[];
};

const iconMap: Record<Required<MenuItem>['icon'], ReactNode> = {
  home: <IoHome />,
  tv: <IoTvOutline />,
  reader: <IoReaderSharp />,
};

const Navbar = ({ menu }: Props): JSX.Element => (
  <nav className={classes.navbar}>
    <div className={classes.menu}>
      {menu.map((menuItem) => (
        <div key={menuItem.id}>
          <Link className={classes.menuItem} href={menuItem.url}>
            {!!menuItem.icon && <div className={classes.icon}>{iconMap[menuItem.icon]}</div>}
            <div>{menuItem.name}</div>
          </Link>
        </div>
      ))}
    </div>
    <div>
      <Link href={routes.settings.href}>
        <a className={classes.settingsIcon}>
          <IoSettingsSharp />
        </a>
      </Link>
    </div>
  </nav>
);

export default Navbar;
