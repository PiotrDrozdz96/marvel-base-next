import Database from 'types/Database';
import { ApiMenuItem } from 'types/Menu';

type Method = 'get';
type Meta = {
  nextIndex: number;
};

type Data<R> = R & {
  meta: Meta;
};

type DateBaseMap = {
  menu: { menu: Data<Record<number, ApiMenuItem>> };
  db: Database[];
};

const request = async <Db extends keyof DateBaseMap, Result = DateBaseMap[Db]>(
  method: Method,
  database: Db
): Promise<Result> => {
  // eslint-disable-next-line compat/compat
  const response = await fetch(`${process.env.BASE_URL}/api/${method}/${database}`);
  const props: Result = await response.json();

  return props;
};

export default request;
