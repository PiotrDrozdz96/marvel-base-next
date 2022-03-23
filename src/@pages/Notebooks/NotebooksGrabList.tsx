import { useState } from 'react';
import { Form } from 'react-final-form';

import routes from 'config/routes';
import { Notebook } from 'types/Notebook';
import SelectOption from 'types/SelectOption';
import List from '@components/List';
import Image from '@components/Image';
import FormActions from '@components/FormActions';
import Select from '@components/Select';
import dateFormat from 'utils/dateFormat';
import getFetch from 'utils/getFetch';

import notebooksMessages from './Notebooks.messages';

type Props = {
  notebooks: Notebook[];
  serieId: string;
  seriesOptions: SelectOption[];
  databaseName: string;
};

type FormValues = {
  serie_id: string;
};

const labels: string[] = [
  notebooksMessages.id,
  notebooksMessages.image_url,
  notebooksMessages.title,
  notebooksMessages.subtitle,
  notebooksMessages.vol,
  notebooksMessages.no,
  notebooksMessages.date,
];

const NotebooksGrabList = ({
  notebooks: initialNotebooks,
  databaseName,
  seriesOptions,
  serieId,
}: Props): JSX.Element => {
  const [notebooks, setNotebooks] = useState(initialNotebooks);

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
        name={notebooksMessages.listName}
        labels={labels}
        filters={
          <Form initialValues={{ serie_id: serieId }} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Select
                  name="serie_id"
                  placeholder={notebooksMessages.serie_id}
                  options={seriesOptions}
                  onChange={handleSubmit}
                />
              </form>
            )}
          </Form>
        }
        bottomActions={
          <FormActions
            backHref={{ pathname: routes.series.id.show.href, query: { databaseName, id: serieId } }}
            withoutMovement
            withoutSave
          />
        }
      >
        {notebooks.map((notebook) => (
          <tr key={notebook.no}>
            <td>{notebook.id}</td>
            <td>
              <Image src={notebook.image_url} alt={notebook.title} preset="mini" withLink />
            </td>
            <td>{notebook.title}</td>
            <td>{notebook.subtitle}</td>
            <td>{notebook.vol}</td>
            <td>{notebook.no}</td>
            <td>{dateFormat(notebook.date)}</td>
          </tr>
        ))}
      </List>
    </>
  );
};

export default NotebooksGrabList;
