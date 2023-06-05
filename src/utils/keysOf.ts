export type Keys<O> = (keyof O)[];

const keysOf = <O extends Record<string, unknown>>(object: O): Keys<O> => Object.keys(object) as Keys<O>;

export default keysOf;
