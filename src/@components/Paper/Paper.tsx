import classes from './Paper.module.scss';

const Paper: React.FC = ({ children }) => <div className={classes.paper}>{children}</div>;

export default Paper;
