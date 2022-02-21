import { ReactNode } from 'react';
import keysOf from 'utils/keysOf';

export const splitToParts = (message: string, variables: Record<string, unknown> = {}): ReactNode[] => {
  const matches = message.match(/\{[^}]+\}|[^{}]+/gm);
  return (matches?.map((match) => {
    const keyMatch = match.match(/^{([^}]+)}$/);
    return keyMatch ? variables[keyMatch[1]] : match;
  }) || []) as ReactNode[];
};

export const interpolate = (message: string, variables: Record<string, unknown>): string =>
  keysOf(variables).reduce(
    (acc, curr) => acc.replace(new RegExp(`{${curr}}`, 'g'), `${variables[curr] || ''}`),
    message
  );
