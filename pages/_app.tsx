import { AppProps } from 'next/app';
import Head from 'next/head';

import Navbar from '@components/Navbar';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar menu={pageProps.menu} />
    <Component {...pageProps} />
  </>
);

export default MyApp;
