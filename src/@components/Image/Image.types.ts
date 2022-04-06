import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import { Preset } from 'types/Image';

export type ImageLoader = {
  name: string;
  regExp: RegExp;
  loader: (preset: Preset | 'full', matchArray: RegExpMatchArray) => string;
};

export type Props = Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'width' | 'height' | 'alt'
> & {
  preset: Preset;
  alt: string;
  withLink?: boolean;
};
