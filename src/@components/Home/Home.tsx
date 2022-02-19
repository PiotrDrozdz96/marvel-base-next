import classes from './Home.module.scss';
import messages from './Home.messages';

const Home = (): JSX.Element => (
  <main className={classes.main}>
    <h1 className={classes.title}>
      {messages.welcomeTo} <span className={classes.name}>{messages.projectName}</span>
    </h1>
  </main>
);

export default Home;
