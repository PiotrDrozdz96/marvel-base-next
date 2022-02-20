import { ReactNode } from 'react';

import NextLink, { LinkProps } from 'next/link';

type Props = Omit<LinkProps, 'href'> & {
  children: ReactNode;
  className?: string;
  href?: LinkProps['href'];
};

const Link = ({ className, href, children, ...props }: Props): JSX.Element =>
  href ? (
    <NextLink href={href} {...props}>
      <a className={className}>{children}</a>
    </NextLink>
  ) : (
    <span className={className}>{children}</span>
  );

export default Link;
