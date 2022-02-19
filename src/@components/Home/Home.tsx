import classes from './Home.module.scss';

const Home = (): JSX.Element => (
  <main className={classes.main}>
    <h1 className={classes.title}>
      Witamy w <span className={classes.name}>Marvel Base</span>
    </h1>
  </main>
);

export default Home;
