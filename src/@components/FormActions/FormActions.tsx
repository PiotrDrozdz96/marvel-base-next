import BackButton from '@components/BackButton';
import SaveButton from '@components/SaveButton';

import classes from './FormActions.module.scss';

type Props = {
  withoutSave?: boolean;
};

const FormActions = ({ withoutSave }: Props): JSX.Element => (
  <div className={classes.formActions}>
    <BackButton />
    {!withoutSave && <SaveButton />}
  </div>
);

export default FormActions;
