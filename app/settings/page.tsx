import NextPage from 'types/NextPage';
import getMenu from '@api/get/front/getMenu';
import getDatabases from '@api/get/getDatabases';
import Settings from '@pages/Settings/Settings';
import getMetadata from 'utils/getMetadata';

export const metadata = getMetadata('- Ustawienia');

const SettingsPage: NextPage = async () => {
  const menu = await getMenu();
  const databases = await getDatabases();

  return <Settings menu={menu} databases={databases} />;
};

export default SettingsPage;
