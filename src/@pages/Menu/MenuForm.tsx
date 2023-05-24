'use client';

import routes from 'config/routes';
import FormPartial from 'types/FormPartial';
import FormVariant from 'types/FormVariant';
import { ApiMenuItem } from 'types/Menu';
import SelectOption from 'types/SelectOption';
import { Form } from '@lib/react-final-form';
import postMenu from '@api/post/postMenu';
import FormContainer from '@components/FormContainer';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import Select from '@components/Select';
import useSubmit from 'hooks/useSubmit';

import { iconOptions, typeOptions, numberFields } from './MenuForm.consts';
import menuMessages from './Menu.messages';

type Props = {
  menu: { id: number; name: string }[];
  initialValues: FormPartial<ApiMenuItem>;
  variant: FormVariant;
  itemId?: number;
};

const MenuForm = ({ menu, initialValues, variant, itemId }: Props): JSX.Element => {
  const menuOptions: SelectOption[] = menu.map(({ id, name }) => ({ value: `${id}`, label: name }));

  const onSubmit = useSubmit<FormPartial<ApiMenuItem>>(
    '',
    postMenu,
    { numberFields },
    variant === 'create' ? undefined : itemId
  );

  return (
    <FormContainer variant={variant} messages={menuMessages} id={itemId} showPathname={routes.menu.id.show.href}>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
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
            <Input name="order" placeholder={menuMessages.order} />
            <FormActions backHref={{ pathname: routes.settings.href }} />
          </form>
        )}
      </Form>
    </FormContainer>
  );
};

export default MenuForm;
