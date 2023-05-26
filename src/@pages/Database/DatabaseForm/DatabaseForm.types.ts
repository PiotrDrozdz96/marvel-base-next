import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';

export type Props = {
  initialValues: FormPartial<{ name: string }>;
  variant: FormVariant;
};
