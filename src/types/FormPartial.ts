type FormPartial<T> = Record<keyof T, string | boolean>;

export default FormPartial;
