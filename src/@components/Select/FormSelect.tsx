import { Field } from 'react-final-form';

import SelectOption from 'types/SelectOption';
import { required as requiredValidation } from 'utils/validators';

import Select from './Select';

type Props = {
  name: string;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
};

const FormSelect = ({ name, placeholder, options, required }: Props): JSX.Element => (
  <Field<string> name={name} validate={required ? requiredValidation : undefined}>
    {({ input, meta: { error, touched, ...meta } }) => (
      <Select
        {...input}
        {...meta}
        options={options}
        error={touched && error}
        placeholder={placeholder}
        required={required}
      />
    )}
  </Field>
);

export default FormSelect;
