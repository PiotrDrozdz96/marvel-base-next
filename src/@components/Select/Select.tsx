import { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { IoTriangle } from 'react-icons/io5';

import SelectOption from 'types/SelectOption';
import Input from '@components/Input/Input';
import useOutsideClick from 'hooks/useOutsideClick';

import classes from './Select.module.scss';

type Props = {
  name: string;
  value?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ name, options, error, value, placeholder, required, onChange }: Props): JSX.Element => {
  const wrapperRef = useRef(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(wrapperRef, () => setIsOpen(false), [isOpen]);

  const onClick = (newValue: string) => {
    if (selectRef.current) {
      selectRef.current.selectedIndex = 0;
      selectRef.current.value = newValue;
      const event = new Event('change', { bubbles: true });
      selectRef.current.dispatchEvent(event);
    }
    setIsOpen(false);
  };

  return (
    <div className={classes.wrapper} ref={wrapperRef}>
      <select name={name} ref={selectRef} value={value} onChange={onChange} hidden>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={classes.input} onClick={() => setIsOpen(true)}>
        <Input
          error={error}
          required={required}
          placeholder={placeholder}
          value={options.find((option) => option.value === value)?.label || ''}
          endAdornment={
            <div className={classNames(classes.icon, { [classes.iconClosed]: isOpen })}>
              <IoTriangle />
            </div>
          }
          readOnly
        />
      </div>
      <ul className={classNames(classes.hiddenList, { [classes.list]: isOpen })}>
        {options.map((option) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className={option.value === value ? classes.active : ''}
            key={option.value}
            onClick={() => onClick(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
