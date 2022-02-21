import { GetServerSideProps } from 'next';

import { MenuItem } from 'types/Menu';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppServerSideProps<P = Record<string, any>> = GetServerSideProps<{ menu: MenuItem[]; title?: string } & P>;

export default AppServerSideProps;
