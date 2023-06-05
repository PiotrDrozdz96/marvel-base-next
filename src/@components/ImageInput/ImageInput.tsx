import { FocusEventHandler, useEffect, useState } from 'react';

import Input, { Props as InputProps } from '@components/Input/Input';
import Image, { Props as ImageProps } from '@components/Image';

import classes from './ImageInput.module.scss';

type Props = Omit<InputProps, 'ref'> & Pick<ImageProps, 'onLoad' | 'onError'> & { initialValue?: string };

const ImageInput = ({ value, initialValue, onBlur, onLoad, onError, ...props }: Props): JSX.Element => {
  const [src, setSrc] = useState(value);

  useEffect(() => {
    if (initialValue) {
      setSrc(initialValue);
    }
  }, [initialValue]);

  const finalOnBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur?.(event);
    setSrc(value);
  };

  return (
    <div>
      <Input value={value} onBlur={finalOnBlur} {...props} />
      {!!src && (
        <div className={classes.imagePreview}>
          <Image src={src} preset="thumb" alt="" onLoad={onLoad} onError={onError} />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
