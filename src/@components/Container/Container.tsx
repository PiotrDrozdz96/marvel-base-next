import classNames from 'classnames';

import classes from './Container.module.scss';

type Props = {
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => (
  <div className={classNames(classes.container, className)}>{children}</div>
);

export default Container;
