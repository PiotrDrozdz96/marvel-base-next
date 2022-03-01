import { useState } from 'react';
import classNames from 'classnames';

import { dimensions } from './Image.conts';
import { Props } from './Image.types';
import classes from './Image.module.scss';

const Image = ({ preset, alt, className, onError, onLoad, ...props }: Props): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  const dimension = dimensions[preset];

  return (
    <img
      {...dimension}
      {...props}
      className={classNames(className, { [classes.errorImage]: !isLoaded, [classes.image]: isLoaded })}
      alt={alt}
      onError={(e) => {
        setIsLoaded(false);
        onError?.(e);
      }}
      onLoad={(e) => {
        setIsLoaded(true);
        onLoad?.(e);
      }}
    />
  );
};

export default Image;
