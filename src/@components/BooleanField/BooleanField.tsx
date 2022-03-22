import { IoCheckmark, IoClose } from 'react-icons/io5';

type Props = {
  value: boolean;
};

const style = { fontSize: 20 };

const BooleanField = ({ value }: Props): JSX.Element =>
  value ? <IoCheckmark style={style} /> : <IoClose style={style} />;

export default BooleanField;
