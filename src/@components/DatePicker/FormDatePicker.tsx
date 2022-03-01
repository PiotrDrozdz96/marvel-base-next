import { Field } from 'react-final-form';

import { required as requiredValidation } from 'utils/validators';

import DatePicker from './DatePicker';

type Props = {
  name: string;
  placeholder: string;
  required?: boolean;
};

const FormDatePicker = ({ name, placeholder, required }: Props): JSX.Element => (
  <Field<Date> name={name} validate={required ? requiredValidation : undefined}>
    {({ input, meta: { error, touched, ...meta } }) => (
      <DatePicker {...input} {...meta} error={touched && error} placeholder={placeholder} required={required} />
    )}
  </Field>
);

export default FormDatePicker;
