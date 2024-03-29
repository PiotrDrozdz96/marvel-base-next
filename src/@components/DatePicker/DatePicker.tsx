import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, SyntheticEvent, useMemo } from 'react';
import pl from 'date-fns/locale/pl';

import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Input from '@components/Input/Input';

import classes from './DatePicker.module.scss';

registerLocale('pl', pl);

type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value' | 'onChange'> & {
  placeholder: string;
  error?: string;
  required?: boolean;
  value?: Date;
  onChange: (value: Date | null, event: SyntheticEvent<unknown, Event> | undefined) => void;
};

const getCustomInput = ({ placeholder = '', error, required }: Partial<Props>) =>
  forwardRef<HTMLInputElement, Record<string, unknown>>((props, ref) => (
    <Input ref={ref} {...props} placeholder={placeholder} error={error} required={required} />
  ));

const DatePicker = ({
  placeholder,
  error,
  required,
  id,
  name,
  value,
  disabled,
  readOnly,
  onBlur,
  onChange,
}: Props): JSX.Element => {
  const CustomInput = getCustomInput({ placeholder, error, required });

  const now = useMemo(() => {
    const date = new Date();
    date.setHours(12);

    return date;
  }, []);

  return (
    <div className={classes.datePicker}>
      <ReactDatePicker
        selected={value || now}
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        customInput={<CustomInput />}
        locale="pl"
        popperPlacement="right"
        dateFormat="dd/MM/yyyy"
        onChange={onChange}
        onBlur={onBlur}
        maxDate={new Date()}
        yearDropdownItemNumber={40}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
};

export default DatePicker;
