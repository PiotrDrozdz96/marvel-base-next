/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { Form } from 'react-final-form';

import routes from 'config/routes';
import classes from 'styles/filters.module.scss';
import { Notebook } from 'types/Notebook';
import List from '@components/List';
import Image from '@components/Image';
import FormActions from '@components/FormActions';
import Input from '@components/Input';
import ListRow from '@components/ListRow';
import dateFormat from 'utils/dateFormat';
import getFetch from 'utils/getFetch';
import width from 'utils/width';

import { NotebooksContext } from './NotebooksProvider';
import notebooksMessages from './Notebooks.messages';

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

type FormValues = {
  url: string;
  from: string;
  to: string;
};

const labels: string[] = [
  notebooksMessages.image_url,
  notebooksMessages.title,
  notebooksMessages.vol,
  notebooksMessages.no,
  notebooksMessages.subtitle,
  notebooksMessages.date,
];

const NotebooksGrabList = ({ variant, databaseName, serieId }: Props): JSX.Element => {
  const { notebooks, volumeNotebooks, setNotebooks } = useContext(NotebooksContext);

  const onSubmit = async (values: FormValues) => {
    const { notebooks: newNotebooks } = await getFetch<{ notebooks: Notebook[] }>(`/api/notebooks`, values);

    setNotebooks(newNotebooks || []);
  };

  return (
    <>
      <List
        name={variant === 'target' ? notebooksMessages.listNameInVolume : notebooksMessages.listName}
        labels={labels}
        droppableId={variant}
        filters={
          variant === 'source' && (
            <Form<FormValues> initialValues={{ url: '', from: '', to: '' }} onSubmit={(values) => onSubmit(values)}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.filters}>
                  <Input name="url" placeholder={notebooksMessages.url} onBlur={handleSubmit} />
                  <Input name="from" placeholder={notebooksMessages.from} onBlur={handleSubmit} />
                  <Input name="to" placeholder={notebooksMessages.to} onBlur={handleSubmit} />
                  <button type="submit" style={{ display: 'none' }} />
                </form>
              )}
            </Form>
          )
        }
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
        {(variant === 'source' ? notebooks : volumeNotebooks).map((notebook, index) => (
          <ListRow key={notebook.title_long} draggableId={`${variant}-${notebook.title_long}`} index={index}>
            <td style={width(100)}>
              <Image src={notebook.image_url} alt={notebook.title} preset="mini" withLink />
            </td>
            <td style={width('33%')}>{notebook.title}</td>
            <td style={width(100)}>{notebook.vol}</td>
            <td style={width(100)}>{notebook.no}</td>
            <td style={width('66%')}>{notebook.subtitle}</td>
            <td style={width(200)}>{dateFormat(notebook.date)}</td>
          </ListRow>
        ))}
      </List>
    </>
  );
};

export default NotebooksGrabList;
