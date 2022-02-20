import classes from './Container.module.scss';

const Container: React.FC = ({ children }) => <div className={classes.container}>{children}</div>;

export default Container;
