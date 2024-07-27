import { Preset } from 'types/Image';
import { dimensions } from 'consts/presets';

import { ImageLoader } from './Image.types';

const filmwebJpgPresetMap: Record<Preset | 'full', 1 | 2 | 3 | 4 | 5> = {
  thumb: 2,
  preview: 5,
  mini: 4,
  full: 3,
};

const filmwebWebpPresetMap: Record<Preset | 'full', 7 | 8 | 11> = {
  thumb: 7,
  preview: 8,
  mini: 7,
  full: 11,
};

export const loaders: ImageLoader[] = [
  {
    name: 'filmwebJpg',
    regExp: /^(https:\/\/fwcdn.pl\/[^.]*.)(\d+)(\.jpg)$/,
    loader: (preset, [, start, , end]) => `${start}${filmwebJpgPresetMap[preset]}${end}`,
  },
  {
    name: 'filmwebWebp',
    regExp: /^(https:\/\/fwcdn.pl\/[^.]*.)(\d+)(\.webp)$/,
    loader: (preset, [, start, , end]) => `${start}${filmwebWebpPresetMap[preset]}${end}`,
  },
  {
    name: 'gildia komiks',
    regExp: /^(https:\/\/images.gildia.pl.*\/okladka-)(\d+)(\..+)$/,
    loader: (preset, [, start, , end]) => `${start}${preset === 'full' ? 700 : dimensions[preset]?.width}${end}`,
  },
  {
    name: 'marvel wiki',
    regExp: /(https:\/\/)(static|vignette)(.*)(\/revision\/.*)/,
    loader: (preset, [, protocol, , start]) =>
      `${protocol}vignette${start}/revision/latest/scale-to-width-down/${
        preset === 'full' ? 700 : dimensions[preset]?.width
      }`,
  },
  {
    name: 'gildia komiks sklep',
    regExp: /^(https:\/\/assets\.gildia\.pl\/system\/thumbs\/.+\/)(\d*)(\.\w+)$/,
    loader: (preset, [, start, , end]) =>
      `/api/img/${preset}?url=${start}${preset === 'full' ? 700 : dimensions[preset]?.width}${end}`,
  },
  {
    name: 'bookxcess',
    regExp: /^(https:\/\/cdn\.shopify\.com\/s\/file.*_)(\d+)(x.jpg)$/,
    loader: (preset, [, start, , end]) => `${start}${preset === 'full' ? 700 : dimensions[preset]?.width}${end}`,
  },
  {
    name: 'comicbookwire',
    regExp: /^(https:\/\/i0\.wp\.com\/www\.comicbookwire\.com\/.*resize=)(\d+)(%2C)(\d+)/,
    loader: (preset, [, start]) =>
      `${start}${preset === 'full' ? '' : `${dimensions[preset]?.width}%2C${dimensions[preset]?.height}`}`,
  },
];
