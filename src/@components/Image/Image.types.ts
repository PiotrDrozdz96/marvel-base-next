import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type Dimension = { width: number; height: number };

export type Preset = 'thumb' | 'mini';

export type Props = Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'width' | 'height' | 'alt'
> & {
  preset: Preset;
  alt: string;
};
