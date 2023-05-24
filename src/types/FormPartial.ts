type FormPartial<T, OriginalKey extends keyof T = never> = Record<Exclude<keyof T, OriginalKey>, string> &
  Pick<T, OriginalKey>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypeFromFormPartial<FP> = FP extends FormPartial<infer FM, any> ? FM : never;

export default FormPartial;
