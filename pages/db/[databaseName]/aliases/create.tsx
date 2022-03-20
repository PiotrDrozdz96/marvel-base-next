import { InferGetServerSidePropsType } from 'next';

import AppServerSideProps from 'types/AppServerSideProps';
import FormPartial from 'types/FormPartial';
import { Alias } from 'types/Alias';
import getMenu from '@api/get/front/getMenu';
import AliasesForm from '@pages/Aliases/AliasesForm';

type Props = {
  databaseName: string;
  initialValues: FormPartial<Alias>;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ query }) => {
  const { databaseName, params: searchParams } = query as Record<string, string>;

  const menu = await getMenu();

  return {
    props: {
      title: `- Alias ${databaseName} - Create`,
      menu,
      databaseName,
      initialValues: { name: '', params: searchParams || '' },
    },
  };
};

const AliasesFormPage = ({ databaseName, initialValues }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AliasesForm databaseName={databaseName} initialValues={initialValues} />
);

export default AliasesFormPage;
