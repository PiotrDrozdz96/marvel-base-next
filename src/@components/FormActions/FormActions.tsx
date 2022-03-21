import classNames from 'classnames';

import BackButton, { BackButtonProps } from '@components/BackButton';
import SaveButton from '@components/SaveButton';

import classes from './FormActions.module.scss';

export type Props = {
  backHref: BackButtonProps['href'];
  onSave?: () => void;
  withoutSave?: boolean;
  withoutMovement?: boolean;
};

const FormActions = ({ withoutSave, withoutMovement, backHref, onSave }: Props): JSX.Element => (
  <div className={classNames(classes.formActions, { [classes.movement]: !withoutMovement })}>
    <BackButton href={backHref} />
    {!withoutSave && <SaveButton onSave={onSave} />}
  </div>
);

export default FormActions;
