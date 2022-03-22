import { Field } from 'react-final-form';

import { required as requiredValidation } from 'utils/validators';

import ImageInput from './ImageInput';

type Props = {
  name: string;
  placeholder: string;
  initialValue?: string;
  required?: boolean;
};

const FormInput = ({ name, placeholder, initialValue, required }: Props): JSX.Element => (
  <Field<string> name={name} validate={required ? requiredValidation : undefined}>
    {({ input, meta: { error, touched, ...meta } }) => (
      <ImageInput
        {...input}
        {...meta}
        error={touched && error}
        initialValue={initialValue}
        placeholder={placeholder}
        required={required}
      />
    )}
  </Field>
);

export default FormInput;
