import { InferGetServerSidePropsType } from 'next';
import fs from 'fs';

import AppServerSideProps from 'types/AppServerSideProps';
import FormVariant from 'types/FormVariant';
import FormPartial from 'types/FormPartial';
import getMenu from 'requests/helpers/getMenu';
import DatabaseForm from '@pages/Database/DatabaseForm';

type Props = {
  initialValues: FormPartial<{ name: string }>;
  variant: FormVariant;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ params }) => {
  const id = params?.databaseName as string | 'create';

  const isCreate = id === 'create';

  if (!isCreate && !fs.existsSync(`src/database/db/${id}`)) {
    return { notFound: true };
  }

  const menu = await getMenu();

  return {
    props: {
      menu,
      title: `- Db - ${isCreate ? 'Create' : `#${id}`}`,
      variant: isCreate ? 'create' : 'edit',
      initialValues: isCreate ? { name: '' } : { name: id },
    },
  };
};

const DatabaseFormPage = ({
  variant,
  initialValues,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => (
  <DatabaseForm initialValues={initialValues} variant={variant} />
);

export default DatabaseFormPage;
