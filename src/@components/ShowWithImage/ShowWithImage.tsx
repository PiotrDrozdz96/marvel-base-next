import Image from '@components/Image';
import Show, { Props as ShowProps } from '@components/Show';

import classes from './ShowWithImage.module.scss';

type Props = ShowProps & {
  imageUrl: string;
  alt: string;
};

const ShowWithImage = ({ imageUrl, alt, children, ...props }: Props): JSX.Element => (
  <Show {...props}>
    <div className={classes.wrapper}>
      <div>{children}</div>
      <div>
        <Image preset="preview" alt={alt} src={imageUrl} priority withLink />
      </div>
    </div>
  </Show>
);

export default ShowWithImage;
