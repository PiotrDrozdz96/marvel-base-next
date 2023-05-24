import { useRouter } from 'next/navigation';

import FormPartial, { TypeFromFormPartial } from 'types/FormPartial';
import convertValuesTo from 'utils/convertValuesTo';

type Props<FM> = {
  numberFields?: (keyof FM)[];
  nullableFields?: (keyof FM)[];
  additionalValues?: Record<string, unknown>;
};

const valuesConverter = <FM extends FormPartial<unknown>>(
  values: FM,
  { numberFields, nullableFields, additionalValues }: Props<FM> = {}
): TypeFromFormPartial<FM> => {
  const numberValues = convertValuesTo(Number, values, numberFields);
  const clearedValues = { ...values };

  nullableFields?.forEach((field) => {
    if (!clearedValues[field]) {
      delete clearedValues[field];
    }
  });

  return { ...clearedValues, ...numberValues, ...additionalValues };
};

const useSubmit = <FM extends FormPartial<unknown>, Id extends number | string = number>(
  databaseName: string,
  callback: (databaseName: string, values: TypeFromFormPartial<FM>, id?: Id) => Promise<unknown>,
  { numberFields, nullableFields, additionalValues }: Props<FM> = {},
  id: Id | undefined = undefined
) => {
  const router = useRouter();

  const onSubmit = async (formValues: FM) => {
    await callback(databaseName, valuesConverter(formValues, { numberFields, nullableFields, additionalValues }), id);
    router.back();
  };

  return onSubmit;
};

export default useSubmit;
