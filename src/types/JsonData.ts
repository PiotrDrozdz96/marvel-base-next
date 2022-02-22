type Meta = {
  nextIndex: number;
};

type JsonData<Key extends string, R> = Record<Key, Record<number, R>> & {
  meta: Meta;
};

export default JsonData;
