import { CSSProperties } from 'react';

import { Dimension } from './Image.types';

export const convertDimensionsToStyle = (dimension: Dimension): CSSProperties => ({
  width: dimension.width - 1,
  height: dimension.height - 1,
});
