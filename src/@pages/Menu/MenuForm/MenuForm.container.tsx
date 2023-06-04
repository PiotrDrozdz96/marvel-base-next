import routes from 'config/routes';
import FormContainer from '@components/FormContainer';

import menuMessages from '../Menu.messages';
import { Props } from './MenuForm.types';
import MenuForm from './MenuForm';

const MenuFormContainer = ({ menu, initialValues, itemId }: Props): JSX.Element => (
  <FormContainer messages={menuMessages} id={itemId} showPathname={routes.menu.id.show.href}>
    <MenuForm menu={menu} initialValues={initialValues} itemId={itemId} />
  </FormContainer>
);

export default MenuFormContainer;
