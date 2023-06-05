import { ReactNode } from 'react';

import Navbar from '@components/Navbar';
import getMenu from '@api/get/front/getMenu';
import getMetadata from 'utils/getMetadata';

import '../styles/globals.scss';

export const metadata = getMetadata();

type Props = {
  children: ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  const menu = await getMenu();

  return (
    <html lang="en">
      <body>
        <Navbar menu={menu} />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
