import { Field } from 'react-final-form';

import { required as requiredValidation } from 'utils/validators';

import Input from './Input';

type Props = {
  name: string;
  placeholder: string;
  required?: boolean;
  onBlur?: () => void;
};

const FormInput = ({ name, placeholder, required, onBlur }: Props): JSX.Element => (
  <Field<string> name={name} validate={required ? requiredValidation : undefined}>
    {({ input, meta: { error, touched, ...meta } }) => (
      <Input
        {...input}
        {...meta}
        error={touched && error}
        placeholder={placeholder}
        required={required}
        onBlur={(e) => {
          input.onBlur(e);
          onBlur?.();
        }}
      />
    )}
  </Field>
);

export default FormInput;
