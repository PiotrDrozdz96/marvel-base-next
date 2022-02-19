import type { NextPage } from 'next';
import Head from 'next/head';

import Home from '@components/Home';

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>Marvel Base</title>
      <meta name="description" content="Marvel Base" />
    </Head>
    <Home />
  </>
);

export default HomePage;
