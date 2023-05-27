'use client';

import { useMemo } from 'react';
import NextImage from 'next/image';

import Link from '@components/Link';
import { dimensions } from 'consts/presets';

import { loaders } from './Image.conts';
import { Props } from './Image.types';
import classes from './Image.module.scss';

const Image = ({ preset, src, alt, withLink, onError, onLoad }: Props): JSX.Element => {
  const [finalSrc, srcLink] = useMemo(() => {
    let result = [src, src];

    loaders.find(({ regExp, loader }) => {
      const match = src.match(regExp);
      if (match) {
        result = [loader(preset, match), loader('full', match)];
        return true;
      }
      return false;
    });
    return result;
  }, [src, preset]);

  const dimension = dimensions[preset];

  const image = <NextImage {...dimension} src={finalSrc} alt={alt} onError={onError} onLoad={onLoad} unoptimized />;

  return withLink ? (
    <Link href={srcLink} className={classes.link} openInNewTab>
      {image}
    </Link>
  ) : (
    image
  );
};

export default Image;
