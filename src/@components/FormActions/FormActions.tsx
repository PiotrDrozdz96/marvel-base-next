import classNames from 'classnames';

import BackButton, { BackButtonProps } from '@components/BackButton';
import SaveButton from '@components/SaveButton';

import classes from './FormActions.module.scss';

export type Props = {
  backHref: BackButtonProps['href'];
  withoutSave?: boolean;
  withoutMovement?: boolean;
};

const FormActions = ({ withoutSave, withoutMovement, backHref }: Props): JSX.Element => (
  <div className={classNames(classes.formActions, { [classes.movement]: !withoutMovement })}>
    <BackButton href={backHref} />
    {!withoutSave && <SaveButton />}
  </div>
);

export default FormActions;
