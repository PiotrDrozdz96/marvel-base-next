import { useState } from 'react';
import { useRouter } from 'next/router';

import routes from 'config/routes';
import FormPartial from 'types/FormPartial';
import { FrontSerie } from 'types/Serie';
import { ApiNotebook } from 'types/Notebook';
import List from '@components/List';
import Image from '@components/Image';
import Spacing from '@components/Spacing';
import Show from '@components/Show';
import TextField from '@components/TextField';
import FormActions from '@components/FormActions';
import ActionButton from '@components/ActionButton';
import seriesMessages from '@pages/Series/Series.messages';
import dateFormat from 'utils/dateFormat';
import { interpolate } from 'utils/interpolate';
import width from 'utils/width';
import convertValuesTo from 'utils/convertValuesTo';
import exclude from 'utils/exclude';

import notebooksMessages from './Notebooks.messages';
import { numberFields } from './NotebookForm.consts';

type Props = {
  notebooks: FormPartial<ApiNotebook>[];
  serie: FrontSerie;
  databaseName: string;
};

const labels: string[] = [
  notebooksMessages.image_url,
  notebooksMessages.title,
  notebooksMessages.subtitle,
  notebooksMessages.vol,
  notebooksMessages.no,
  notebooksMessages.date,
  '',
];

const NotebooksImportList = ({ notebooks, databaseName, serie }: Props): JSX.Element => {
  const router = useRouter();
  const [items, setItems] = useState(notebooks);

  const backHref = { pathname: routes.series.id.show.href, query: { databaseName, id: serie.id } };

  const onDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const onSubmit = async () => {
    const mappedItems = items.map((item) => ({
      ...item,
      ...convertValuesTo(Number, item, exclude(numberFields, ['order'])),
    }));

    await fetch(`/api/db/${databaseName}/notebooks/${serie.id}/import`, {
      method: 'POST',
      body: JSON.stringify({ notebooks: mappedItems }),
    });
    router.back();
  };

  return (
    <>
      <Show name={interpolate(seriesMessages.itemName, { id: serie.id })} backHref={backHref}>
        <TextField label={seriesMessages.id} value={serie.id} />
        <TextField label={seriesMessages.name} value={serie.name} />
        <TextField label={seriesMessages.waveId} value={serie.waveName} />
      </Show>
      <Spacing />
      <List
        name={notebooksMessages.listName}
        labels={labels}
        bottomActions={<FormActions backHref={backHref} onSave={onSubmit} withoutMovement />}
      >
        {items.map((notebook, index) => (
          <tr key={notebook.no}>
            <td>
              <Image src={notebook.image_url} alt={notebook.title} preset="mini" withLink />
            </td>
            <td>{notebook.title}</td>
            <td>{notebook.subtitle}</td>
            <td>{notebook.vol}</td>
            <td>{notebook.no}</td>
            <td>{dateFormat(notebook.date)}</td>
            <td style={width(90)}>
              <ActionButton
                variant="delete"
                itemName={`${notebook.title} Vol ${notebook.vol} #${notebook.no}`}
                onDelete={() => onDelete(index)}
              />
            </td>
          </tr>
        ))}
      </List>
    </>
  );
};

export default NotebooksImportList;