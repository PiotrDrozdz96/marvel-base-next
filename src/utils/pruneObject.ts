export type BaseRecord = Record<string, unknown>;
export type WithRequired<T extends BaseRecord, R extends BaseRecord> = Partial<T> & Pick<R, keyof R & string>;

const pruneObject = <T extends BaseRecord, R extends BaseRecord = Partial<T>>(
  object: T,
  comparator: (key: keyof T) => boolean = (key) => typeof object[key] === 'undefined' || object[key] === ''
): WithRequired<T, R> => {
  const newObject = {} as WithRequired<T, R>;

  Object.keys(object).forEach((key: keyof WithRequired<T, R>) => {
    if (!comparator(key)) {
      newObject[key] = object[key] as never;
    }
  });

  return newObject;
};

export default pruneObject;
