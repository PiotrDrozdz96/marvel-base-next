import classNames from 'classnames';

import classes from './Paper.module.scss';

type Props = {
  variant?: 'tertiary' | 'secondary';
};

const Paper: React.FC<Props> = ({ variant = 'secondary', children }) => (
  <div
    className={classNames(classes.paper, {
      [classes.tertiary]: variant === 'tertiary',
      [classes.secondary]: variant === 'secondary',
    })}
  >
    {children}
  </div>
);

export default Paper;
