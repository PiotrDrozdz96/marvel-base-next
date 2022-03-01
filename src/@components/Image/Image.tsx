import { useMemo, useState } from 'react';
import classNames from 'classnames';

import Link from '@components/Link';

import { dimensions, loaders } from './Image.conts';
import { Props } from './Image.types';
import classes from './Image.module.scss';

const Image = ({ preset, src, alt, className, onError, onLoad, withLink, ...props }: Props): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const [finalSrc, srcLink] = useMemo(() => {
    let result = [src, src];

    if (src) {
      loaders.find(({ regExp, loader }) => {
        const match = src.match(regExp);
        if (match) {
          result = [loader(preset, match), loader('full', match)];
        }
        return false;
      });
    }

    return result;
  }, [src, preset]);

  const dimension = dimensions[preset];

  const image = (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <img
      {...dimension}
      {...props}
      src={showFullImage ? srcLink : finalSrc}
      className={classNames(className, { [classes.errorImage]: !isLoaded, [classes.image]: isLoaded })}
      alt={alt}
      onContextMenu={(e) => {
        if (!showFullImage) {
          setShowFullImage(e.button === 2);
        }
      }}
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

  return withLink ? (
    <Link href={srcLink} className={classes.link} openInNewTab>
      {image}
    </Link>
  ) : (
    image
  );
};

export default Image;
