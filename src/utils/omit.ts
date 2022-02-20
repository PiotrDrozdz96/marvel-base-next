import pruneObject from 'utils/pruneObject';

const omit = <T extends Record<string, unknown>>(object: T, keys: (keyof T)[]): Partial<T> =>
  pruneObject(object, (key) => keys.includes(key));

export default omit;
