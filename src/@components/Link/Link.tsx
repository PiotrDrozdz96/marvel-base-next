/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactNode } from 'react';

import NextLink, { LinkProps } from 'next/link';
import stringifyHref from 'utils/stringifyHref';

export type Props = Omit<LinkProps, 'href'> & {
  children: ReactNode;
  className?: string;
  href?: LinkProps['href'];
  openInNewTab?: boolean;
  onClick?: () => void;
};

const Link = ({ className, href, children, openInNewTab, ...props }: Props): JSX.Element =>
  href ? (
    <NextLink
      href={typeof href === 'string' ? href : stringifyHref(href)}
      {...props}
      className={className}
      target={openInNewTab ? '_blank' : undefined}
    >
      {children}
    </NextLink>
  ) : (
    <span className={className}>{children}</span>
  );

export default Link;
