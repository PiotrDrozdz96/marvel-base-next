import { Field } from '@lib/react-final-form';

import Switch from './Switch';

type Props = {
  name: string;
  placeholder: string;
};

const FormSwitch = ({ name, placeholder }: Props): JSX.Element => (
  <Field<boolean> name={name} type="checkbox">
    {({ input }) => (
      <Switch id={name} placeholder={placeholder} checked={input.checked || false} onChange={input.onChange} />
    )}
  </Field>
);

export default FormSwitch;
