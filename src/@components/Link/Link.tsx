import { ReactNode } from 'react';

import NextLink, { LinkProps } from 'next/link';

export type Props = Omit<LinkProps, 'href'> & {
  children: ReactNode;
  className?: string;
  href?: LinkProps['href'];
  openInNewTab?: boolean;
};

const Link = ({ className, href, children, openInNewTab, ...props }: Props): JSX.Element =>
  href ? (
    <NextLink href={href} {...props}>
      <a className={className} target={openInNewTab ? '_blank' : undefined}>
        {children}
      </a>
    </NextLink>
  ) : (
    <span className={className}>{children}</span>
  );

export default Link;
