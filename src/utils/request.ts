import { ApiMenuItem } from 'types/Menu';

type Method = 'get';
type Meta = {
  nextIndex: number;
};
type DateBaseMap = {
  menu: Record<number, ApiMenuItem>;
};

type Data<R> = R & {
  meta: Meta;
};

const request = async <Db extends keyof DateBaseMap, Result = Pick<DateBaseMap, Db>>(
  method: Method,
  database: Db
): Promise<Data<Result>> => {
  // eslint-disable-next-line compat/compat
  const response = await fetch(`${process.env.BASE_URL}/api/${method}/${database}`);
  const props: Data<Result> = await response.json();

  return props;
};

export default request;
