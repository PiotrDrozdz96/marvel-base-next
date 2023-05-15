import { notFound } from 'next/navigation';
import fs from 'fs';

import NextPage, { GenerateMetaData } from 'types/NextPage';
import DatabaseForm from '@pages/Database/DatabaseForm';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) => {
  const id = params?.id as string | 'create';
  const isCreate = id === 'create';

  return getMetadata(`- Menu - ${isCreate ? 'Create' : `#${id}`}`);
};
const DatabaseFormPage: NextPage = async ({ params }) => {
  const id = params?.databaseName as string | 'create';

  const isCreate = id === 'create';

  if (!isCreate && !fs.existsSync(`src/database/db/${id}`)) {
    notFound();
  }

  return <DatabaseForm initialValues={isCreate ? { name: '' } : { name: id }} variant={isCreate ? 'create' : 'edit'} />;
};

export default DatabaseFormPage;
