import { Field } from 'react-final-form';

import { required as requiredValidation } from 'utils/validators';

import ImageInput from './ImageInput';

type Props = {
  name: string;
  placeholder: string;
  required?: boolean;
};

const FormInput = ({ name, placeholder, required }: Props): JSX.Element => (
  <Field<string> name={name} validate={required ? requiredValidation : undefined}>
    {({ input, meta: { error, touched, ...meta } }) => (
      <ImageInput {...input} {...meta} error={touched && error} placeholder={placeholder} required={required} />
    )}
  </Field>
);

export default FormInput;
