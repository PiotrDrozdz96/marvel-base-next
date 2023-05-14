'use client';

import { useMemo, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';

import Link from '@components/Link';
import { dimensions } from 'consts/presets';

import { loaders } from './Image.conts';
import { Props } from './Image.types';
import classes from './Image.module.scss';

const Image = ({ preset, src, alt, className, onError, onLoad, withLink, ...props }: Props): JSX.Element => {
  const { ref, inView } = useInView({ triggerOnce: true, initialInView: false });
  const [isJavascriptEnabled, setIsJavascriptEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsJavascriptEnabled(true);
  }, []);

  const [finalSrc, srcLink] = useMemo(() => {
    let result = [`/api/img/${preset}?url=${src}`, src];

    if (src) {
      loaders.find(({ regExp, loader }) => {
        const match = src.match(regExp);
        if (match) {
          result = [loader(preset, match), loader('full', match)];
          return true;
        }
        return false;
      });
    }

    return result;
  }, [src, preset]);

  const dimension = dimensions[preset];

  const image = (
    <>
      {!isJavascriptEnabled && (
        <noscript>
          <img {...dimension} {...props} src={finalSrc} className={classNames(className, classes.image)} alt={alt} />
        </noscript>
      )}
      {inView && (
        <img
          {...dimension}
          {...props}
          src={finalSrc}
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
      )}
    </>
  );

  return (
    <div ref={ref} style={{ minWidth: dimension.width, height: dimension.height }}>
      {withLink ? (
        <Link href={srcLink} className={classes.link} openInNewTab>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default Image;
