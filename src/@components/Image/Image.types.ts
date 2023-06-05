import { ImageProps } from 'next/image';

import { Preset } from 'types/Image';

export type ImageLoader = {
  name: string;
  regExp: RegExp;
  loader: (preset: Preset | 'full', matchArray: RegExpMatchArray) => string;
};

export type Props = Pick<ImageProps, 'alt' | 'priority' | 'onError' | 'onLoad'> & {
  src: string;
  preset: Preset;
  withLink?: boolean;
};
