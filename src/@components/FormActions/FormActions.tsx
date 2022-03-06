import BackButton, { BackButtonProps } from '@components/BackButton';
import SaveButton from '@components/SaveButton';

import classes from './FormActions.module.scss';

export type Props = {
  backHref: BackButtonProps['href'];
  withoutSave?: boolean;
};

const FormActions = ({ withoutSave, backHref }: Props): JSX.Element => (
  <div className={classes.formActions}>
    <BackButton href={backHref} />
    {!withoutSave && <SaveButton />}
  </div>
);

export default FormActions;
