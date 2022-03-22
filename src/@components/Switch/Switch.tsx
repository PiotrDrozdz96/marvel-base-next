import classNames from 'classnames';

import classes from './Switch.module.scss';

type Props = {
  id: string;
  placeholder: string;
  checked: boolean;
  onChange: (e: unknown) => void;
};

const Switch = ({ id, checked, placeholder, onChange }: Props): JSX.Element => (
  <label className={classes.label} htmlFor={id}>
    <span className={classes.switch}>
      <span className={classNames(classes.switchBase, { [classes.checked]: checked })}>
        <span className={classes.base}>
          <input type="checkbox" id={id} name={id} className={classes.input} checked={checked} onChange={onChange} />
          <span className={classes.thumb} />
        </span>
      </span>
      <span className={classNames(classes.track, { [classes.checked]: checked })} />
    </span>
    <span>{placeholder}</span>
  </label>
);

export default Switch;
