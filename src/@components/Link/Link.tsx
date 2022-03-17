/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactNode } from 'react';

import NextLink, { LinkProps } from 'next/link';

export type Props = Omit<LinkProps, 'href'> & {
  children: ReactNode;
  className?: string;
  href?: LinkProps['href'];
  openInNewTab?: boolean;
  onClick?: () => void;
};

const Link = ({ className, href, children, openInNewTab, onClick, ...props }: Props): JSX.Element =>
  href ? (
    <NextLink href={href} {...props}>
      <a className={className} target={openInNewTab ? '_blank' : undefined} onClick={onClick}>
        {children}
      </a>
    </NextLink>
  ) : (
    <span className={className}>{children}</span>
  );

export default Link;
