import { Preset, Dimension, ImageLoader } from './Image.types';

export const dimensions: Record<Preset, Dimension> = {
  thumb: {
    width: 122,
    height: 186,
  },
  mini: {
    width: 66,
    height: 93,
  },
  preview: {
    width: 370,
    height: 528,
  },
};

const filmwebPresetMap: Record<Preset | 'full', 1 | 2 | 3 | 4 | 5> = {
  thumb: 2,
  preview: 5,
  mini: 4,
  full: 3,
};

export const loaders: ImageLoader[] = [
  {
    name: 'filmweb',
    regExp: /^(https:\/\/fwcdn.pl\/[^.]*.)(\d)(\..*)$/,
    loader: (preset, [, start, , end]) => `${start}${filmwebPresetMap[preset]}${end}`,
  },
  {
    name: 'gildia komiks',
    regExp: /^(https:\/\/images.gildia.pl.*\/okladka-)(\d+)(\..+)$/,
    loader: (preset, [, start, , end]) => `${start}${preset === 'full' ? 700 : dimensions[preset]?.width}${end}`,
  },
  {
    name: 'marvel wiki',
    regExp: /(https:\/\/)(static|vignette)(.*\/scale-to-width-down\/)(\d+)/,
    loader: (preset, [, protocol, , start]) =>
      `${protocol}vignette${start}${preset === 'full' ? 700 : dimensions[preset]?.width}`,
  },
  {
    name: 'gildia komiks sklep',
    regExp: /^(https:\/\/assets\.gildia\.pl\/system\/thumbs\/.+\/)(\d*)(\.\w+)$/,
    loader: (preset, [, start, , end]) => `${start}${preset === 'full' ? 700 : dimensions[preset]?.width}${end}`,
  },
];
