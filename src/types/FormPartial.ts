type FormPartial<T, OriginalKey extends keyof T = never> = Record<Exclude<keyof T, OriginalKey>, string> &
  Pick<T, OriginalKey>;

export default FormPartial;
