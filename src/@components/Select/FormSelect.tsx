import { Field } from 'react-final-form';

import Select from './Select';

type Props = {
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
};

const FormSelect = ({ name, placeholder, options }: Props): JSX.Element => (
  <Field<string> name={name}>
    {({ input, meta: { error, touched, ...meta } }) => (
      <Select {...input} {...meta} options={options} error={touched && error} placeholder={placeholder} />
    )}
  </Field>
);

export default FormSelect;
