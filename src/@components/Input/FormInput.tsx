import { Field } from 'react-final-form';

import Input from './Input';

type Props = {
  name: string;
  placeholder: string;
};

const FormInput = ({ name, placeholder }: Props): JSX.Element => (
  <Field<string> name={name}>
    {({ input, meta: { error, touched, ...meta } }) => (
      <Input {...input} {...meta} error={touched && error} placeholder={placeholder} />
    )}
  </Field>
);

export default FormInput;
