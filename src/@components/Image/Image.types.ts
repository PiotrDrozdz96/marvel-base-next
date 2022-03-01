import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type Dimension = { width: number; height: number };

export type Preset = 'thumb' | 'mini';

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
