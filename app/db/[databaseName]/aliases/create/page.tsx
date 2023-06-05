import NextPage, { GenerateMetaData } from 'types/NextPage';
import AliasesForm from '@pages/Aliases/AliasesForm';
import getMetadata from 'utils/getMetadata';

export const generateMetadata: GenerateMetaData = async ({ params }) =>
  getMetadata(`- Alias ${params.databaseName} - Create`);

const mapSearchParams = (searchParams: Record<string, string>): string =>
  Object.keys(searchParams).reduce((acc, key) => `${acc}${acc ? '&' : ''}${key}=${searchParams[key]}`, '');

const AliasesFormPage: NextPage = async ({ params, searchParams }) => (
  <AliasesForm
    databaseName={params.databaseName as string}
    initialValues={{ name: '', params: searchParams ? mapSearchParams(searchParams) : '' }}
  />
);

export default AliasesFormPage;
