import classes from './ActionsButtons.module.scss';

const ActionsButtons: React.FC = ({ children }) => <div className={classes.actionsButtons}>{children}</div>;

export default ActionsButtons;
