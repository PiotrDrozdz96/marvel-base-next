import classNames from 'classnames';

import classes from './Checkbox.module.scss';

export type Props = {
  id: string;
  checked: boolean;
  label: string;
};

const Checkbox = ({ id, checked, label }: Props): JSX.Element => (
  <>
    <label className={classes.wrapper} htmlFor={id}>
      <input id={id} type="checkbox" className={classes.checkbox} defaultChecked={checked} />
      <div className={classNames(classes.checkmark, { [classes.checked]: checked })} />
      <div>
        <div className={classes.labelWrapper}>{label}</div>
      </div>
    </label>
  </>
);

export default Checkbox;
