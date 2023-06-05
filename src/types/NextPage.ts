import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  params: ParsedUrlQuery;
  searchParams: Record<string, string>;
};

type NextPage = (props: Props) => Promise<ReactNode>;

export type GenerateMetaData = (props: Props) => Promise<Metadata>;

export default NextPage;
