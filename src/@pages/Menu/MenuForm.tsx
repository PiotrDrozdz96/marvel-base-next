import routes from 'config/routes';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiMenuItem } from 'types/Menu';
import SelectOption from 'types/SelectOption';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import Select from '@components/Select';

import { iconOptions, typeOptions } from './MenuForm.consts';
import menuMessages from './Menu.messages';

type Props = {
  menu: { id: number; name: string }[];
  initialValues: FormPartial<ApiMenuItem>;
  variant: FormVariant;
  itemId?: number;
};

const MenuForm = ({ menu, initialValues, variant, itemId }: Props): JSX.Element => {
  const menuOptions: SelectOption[] = menu.map(({ id, name }) => ({ value: `${id}`, label: name }));

  return (
    <FormContainer
      variant={variant}
      initialValues={initialValues}
      databaseName="menu"
      messages={menuMessages}
      id={itemId}
      showPathname={routes.menu.id.show.href}
    >
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder={menuMessages.name} required />
          <Select name="type" placeholder={menuMessages.type} options={typeOptions} required />
          <Input name="url" placeholder={menuMessages.url} required={values.type === 'SUB_MENU'} />
          {values.type === 'MAIN_MENU' && (
            <Select name="icon" placeholder={menuMessages.icon} options={iconOptions} required />
          )}
          {values.type === 'SUB_MENU' && (
            <Select name="parent_id" placeholder={menuMessages.parent_id} options={menuOptions} required />
          )}
          <Input name="order" placeholder={menuMessages.order} required />
          <FormActions />
        </form>
      )}
    </FormContainer>
  );
};

export default MenuForm;
