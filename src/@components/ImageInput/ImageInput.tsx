import { FocusEventHandler, useState } from 'react';

import Input, { Props as InputProps } from '@components/Input/Input';
import Image, { Props as ImageProps } from '@components/Image';

import classes from './ImageInput.module.scss';

type Props = Omit<InputProps, 'ref'> & Pick<ImageProps, 'onLoad' | 'onError'>;

const ImageInput = ({ value, onBlur, onLoad, onError, ...props }: Props): JSX.Element => {
  const [src, setSrc] = useState(value);

  const finalOnBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur?.(event);
    setSrc(value);
  };

  return (
    <div>
      <Input value={value} onBlur={finalOnBlur} {...props} />
      {!!src && (
        <Image src={src} className={classes.imagePreview} preset="thumb" alt="" onLoad={onLoad} onError={onError} />
      )}
    </div>
  );
};

export default ImageInput;
