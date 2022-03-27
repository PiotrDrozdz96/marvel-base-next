/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { Form } from 'react-final-form';

import routes from 'config/routes';
import classes from 'styles/filters.module.scss';
import { Notebook } from 'types/Notebook';
import SelectOption from 'types/SelectOption';
import List from '@components/List';
import Image from '@components/Image';
import FormActions from '@components/FormActions';
import Select, { SelectInput } from '@components/Select';
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
      wavesOptions: SelectOption[];
      databaseName: string;
    }
  | {
      variant: 'target';
      serieId?: never;
      wavesOptions?: never;
      databaseName?: never;
    };

type FormValues = {
  serie_id: string;
  no_from: string;
};

const labels: string[] = [
  notebooksMessages.id,
  notebooksMessages.image_url,
  notebooksMessages.title,
  notebooksMessages.vol,
  notebooksMessages.no,
  notebooksMessages.subtitle,
  notebooksMessages.date,
];

const NotebooksGrabList = ({ variant, databaseName, wavesOptions = [], serieId }: Props): JSX.Element => {
  const { waveId, seriesOptions, notebooks, volumeNotebooks, setNotebooks, setWaveId } = useContext(NotebooksContext);

  const onSubmit = async (values: FormValues) => {
    const { notebooks: newNotebooks } = await getFetch<{ notebooks: Notebook[] }>(
      `/api/db/${databaseName}/notebooks`,
      values
    );

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
            <Form<FormValues>
              initialValues={{ serie_id: serieId, no_from: '' }}
              onSubmit={(values) => onSubmit(values)}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.filters}>
                  <SelectInput
                    name="wave_id"
                    value={waveId}
                    placeholder={notebooksMessages.wave_id}
                    options={wavesOptions}
                    onChange={(e) => setWaveId(e.target.value)}
                  />
                  <Select
                    name="serie_id"
                    placeholder={notebooksMessages.serie_id}
                    options={seriesOptions}
                    onChange={handleSubmit}
                  />
                  <Input name="no_from" placeholder={notebooksMessages.no_from} onBlur={handleSubmit} />
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
          <ListRow key={notebook.id} draggableId={`${variant}-${notebook.id}`} index={index}>
            <td style={width(100)}>{notebook.id}</td>
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
