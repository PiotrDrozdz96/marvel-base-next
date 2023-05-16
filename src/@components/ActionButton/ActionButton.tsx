import { ReactNode } from 'react';
import { IoAdd, IoPencil, IoEye, IoCalendar } from 'react-icons/io5';

import Button, { ButtonProps } from '@components/Button';

import messages from './ActionButton.messages';

type Variant = 'add' | 'edit' | 'show' | 'sortByDate';

export type Props = {
  variant: Variant;
  href?: ButtonProps['href'];
  onClick?: () => void;
};

const iconMap: Record<Variant, ReactNode> = {
  add: <IoAdd />,
  edit: <IoPencil />,
  show: <IoEye />,
  sortByDate: <IoCalendar />,
};

const ActionButton = ({ variant, href, onClick }: Props): JSX.Element => (
  <Button
    type={['delete', 'sortByDate'].includes(variant) ? 'button' : 'link'}
    href={href}
    icon={iconMap[variant]}
    onClick={onClick}
  >
    {messages[variant]}
  </Button>
);

export default ActionButton;
