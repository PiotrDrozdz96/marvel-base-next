import { ReactNode } from 'react';
import { IoAdd, IoPencil, IoEye } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/Button';

import messages from './ActionButton.messages';

type Variant = 'add' | 'edit' | 'show';

export type Props = {
  variant: Variant;
  href?: ButtonProps['href'];
};

const iconMap: Record<Variant, ReactNode> = {
  add: <IoAdd />,
  edit: <IoPencil />,
  show: <IoEye />,
};

const ActionButton = ({ variant, href }: Props): JSX.Element => (
  <Button type="link" href={href} icon={iconMap[variant]}>
    {messages[variant]}
  </Button>
);

export default ActionButton;
