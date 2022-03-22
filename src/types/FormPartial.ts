type FormPartial<T, BooleanKey extends keyof T = never> = Record<Exclude<keyof T, BooleanKey>, string> &
  Record<BooleanKey, boolean>;

export default FormPartial;
