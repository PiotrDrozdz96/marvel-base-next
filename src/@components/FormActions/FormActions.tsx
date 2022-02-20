import BackButton from '@components/BackButton';
import SaveButton from '@components/SaveButton';

import classes from './FormActions.module.scss';

const FormActions = (): JSX.Element => (
  <div className={classes.formActions}>
    <BackButton />
    <SaveButton />
  </div>
);

export default FormActions;
