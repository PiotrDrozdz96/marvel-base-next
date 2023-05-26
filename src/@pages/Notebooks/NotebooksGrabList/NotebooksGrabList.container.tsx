import routes from 'config/routes';
import { ListWrapper } from '@components/List';
import FormActions from '@components/FormActions';
import notebooksMessages from '../Notebooks.messages';
import NotebooksFilters from './NotebooksFilters';
import NotebooksGrabList from './NotebooksGrabList';

type Props =
  | {
      variant: 'source';
      serieId: string;
      databaseName: string;
    }
  | {
      variant: 'target';
      serieId?: never;
      databaseName?: never;
    };

const NotebooksGrabListContainer = ({ variant, databaseName, serieId }: Props): JSX.Element => (
  <ListWrapper
    name={variant === 'target' ? notebooksMessages.listNameInVolume : notebooksMessages.listName}
    filters={variant === 'source' && <NotebooksFilters />}
    bottomActions={
      variant === 'source' && (
        <FormActions
          backHref={{ pathname: routes.series.id.show.href, query: { databaseName, id: serieId } }}
          withoutMovement
          withoutSave
        />
      )
    }
  >
    <NotebooksGrabList variant={variant} />
  </ListWrapper>
);

export default NotebooksGrabListContainer;
