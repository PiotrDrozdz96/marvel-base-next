import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import classes from './Input.module.scss';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder: string;
  error?: string;
  endAdornment?: ReactNode;
  required?: boolean;
};

const Input = ({ placeholder, error, endAdornment, required, ...props }: Props): JSX.Element => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={classes.label}>
    <input
      {...props}
      type="text"
      className={classNames(classes.input, { [classes.errorInput]: error })}
      placeholder=" "
    />
    <div className={classes.placeholder}>{required ? `${placeholder}*` : placeholder}</div>
    <div className={classes.endAdornment}>{endAdornment}</div>
    <div className={classes.error}>{error}</div>
  </label>
);

export default Input;
