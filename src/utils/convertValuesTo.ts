/* eslint-disable @typescript-eslint/no-explicit-any */
const convertValuesTo = (
  To: NumberConstructor | StringConstructor,
  values: any,
  fields?: (string | number | symbol)[]
) => {
  const resultValues: any = {};

  if (fields) {
    fields.forEach((key) => {
      resultValues[key] = To(values[key]);
    });
  }

  return resultValues;
};

export default convertValuesTo;
