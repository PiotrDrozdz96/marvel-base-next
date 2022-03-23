/* eslint-disable react/no-unescaped-entities */
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import Navbar from '@components/Navbar';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{`Marvel Base ${pageProps.title || ''}`}</title>
      <meta name="description" content={`Marvel Base ${pageProps.title || ''}`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Script type="text/javascript">window['__react-beautiful-dnd-disable-dev-warnings'] = true;</Script>
    {pageProps.menu && <Navbar menu={pageProps.menu} />}
    <Component {...pageProps} />
  </>
);

export default MyApp;
