import { useRouter } from 'next/router';

import FormPartial from 'types/FormPartial';
import ActionButton from '@components/ActionButton';
import Container from '@components/Container';
import Toolbar from '@components/Toolbar';
import routes from 'config/routes';
import { interpolate } from 'utils/interpolate';

import databaseMessages from '../Database.messages';
import DatabaseForm from './DatabaseForm';

type Props = {
  initialValues: FormPartial<{ name: string }>;
  variant: 'create' | 'edit';
};

const DatabaseFormContainer = ({ variant, initialValues }: Props): JSX.Element => {
  const router = useRouter();

  const onSubmit = async (values: FormPartial<{ name: string }>) => {
    await fetch(variant === 'create' ? '/api/add/db' : `/api/edit/db/${initialValues.name}`, {
      method: 'POST',
      body: JSON.stringify(values),
    });
    router.back();
  };

  return (
    <Container>
      <Toolbar
        name={
          variant === 'create'
            ? databaseMessages.createName
            : interpolate(databaseMessages.editName, { id: initialValues.name })
        }
      >
        {variant === 'edit' && (
          <></>
          // <ActionButton variant="show" href={{ pathname: routes.menu.id.show.href, query: { id: itemId } }} />
        )}
      </Toolbar>
      <DatabaseForm initialValues={initialValues} onSubmit={onSubmit} />
    </Container>
  );
};

export default DatabaseFormContainer;
