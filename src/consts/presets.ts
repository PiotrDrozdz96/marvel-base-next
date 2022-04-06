import { Preset, Dimension } from 'types/Image';

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
    height: 560,
  },
};
