import routes from 'config/routes';
import FormContainer from '@components/FormContainer';

import menuMessages from '../Menu.messages';
import { Props } from './MenuForm.types';
import MenuForm from './MenuForm';

const MenuFormContainer = ({ menu, initialValues, variant, itemId }: Props): JSX.Element => (
  <FormContainer variant={variant} messages={menuMessages} id={itemId} showPathname={routes.menu.id.show.href}>
    <MenuForm menu={menu} initialValues={initialValues} variant={variant} itemId={itemId} />
  </FormContainer>
);

export default MenuFormContainer;
