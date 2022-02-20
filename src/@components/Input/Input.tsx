import classNames from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import classes from './Input.module.scss';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder: string;
  error?: string;
};

const Input = ({ placeholder, error, ...props }: Props): JSX.Element => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={classes.label}>
    <input
      {...props}
      type="text"
      className={classNames(classes.input, { [classes.errorInput]: error })}
      placeholder=" "
    />
    <div className={classes.placeholder}>{placeholder}</div>
    <div className={classes.error}>{error}</div>
  </label>
);

export default Input;
