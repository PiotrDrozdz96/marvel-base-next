import { ReactNode } from 'react';
import { IoHome, IoTvOutline, IoReaderSharp } from 'react-icons/io5';

import { MenuItem } from 'types/Menu';

const iconMap: Record<Required<MenuItem>['icon'], ReactNode> = {
  home: <IoHome />,
  tv: <IoTvOutline />,
  reader: <IoReaderSharp />,
};

export default iconMap;
