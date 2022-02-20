import { ReactNode } from 'react';
import { IoAdd, IoPencil, IoTrash, IoEye } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/Button';

import messages from './ActionButton.messages';

type Variant = 'add' | 'edit' | 'delete' | 'show';

type Props = {
  variant: Variant;
  href?: ButtonProps['href'];
};

const iconMap: Record<Variant, ReactNode> = {
  add: <IoAdd />,
  edit: <IoPencil />,
  delete: <IoTrash />,
  show: <IoEye />,
};

const ActionButton = ({ variant, href }: Props): JSX.Element => (
  <Button type={href ? 'link' : 'button'} href={href} icon={iconMap[variant]}>
    {messages[variant]}
  </Button>
);

export default ActionButton;
