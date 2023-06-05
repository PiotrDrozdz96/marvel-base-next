import { Keys } from 'utils/keysOf';
import pruneObject from 'utils/pruneObject';

const pick = <T extends Record<string, unknown>, K extends Keys<T>>(
  object: T,
  keys: K
): Pick<T, (typeof keys)[number]> =>
  pruneObject(object, (key) => !keys.includes(key)) as Pick<T, (typeof keys)[number]>;

export default pick;
