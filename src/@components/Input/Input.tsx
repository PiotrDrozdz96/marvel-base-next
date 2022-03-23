/* eslint-disable jsx-a11y/label-has-associated-control */
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import classes from './Input.module.scss';

export type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value'> & {
  placeholder: string;
  error?: string;
  endAdornment?: ReactNode;
  required?: boolean;
  value?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder,
      error,
      endAdornment,
      required,
      id,
      name,
      value,
      disabled,
      readOnly,
      onBlur,
      onInput,
      onClick,
      onChange,
    },
    ref
  ): JSX.Element => (
    <div>
      <label className={classes.label}>
        <input
          id={id}
          ref={ref}
          name={name}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          type="text"
          className={classNames(classes.input, { [classes.errorInput]: error })}
          placeholder=" "
          onBlur={onBlur}
          onInput={onInput}
          onClick={onClick}
          onChange={onChange}
        />
        <div className={classes.placeholder}>{required ? `${placeholder}*` : placeholder}</div>
        <div className={classes.endAdornment}>{endAdornment}</div>
        <div className={classes.error}>{error}</div>
      </label>
    </div>
  )
);

export default Input;
