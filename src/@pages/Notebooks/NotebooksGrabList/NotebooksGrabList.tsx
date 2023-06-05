'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';

import { BaseDroppableList } from '@components/List';
import Image from '@components/Image';
import ListRow from '@components/ListRow';
import dateFormat from 'utils/dateFormat';
import width from 'utils/width';

import { NotebooksContext } from '../NotebooksProvider';
import notebooksMessages from '../Notebooks.messages';

type Props = {
  variant: 'source' | 'target';
};

const labels: string[] = [
  notebooksMessages.image_url,
  notebooksMessages.title,
  notebooksMessages.vol,
  notebooksMessages.no,
  notebooksMessages.subtitle,
  notebooksMessages.date,
];

const NotebooksGrabList = ({ variant }: Props): JSX.Element => {
  const { notebooks, volumeNotebooks } = useContext(NotebooksContext);

  return (
    <BaseDroppableList labels={labels} droppableId={variant}>
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
    </BaseDroppableList>
  );
};

export default NotebooksGrabList;
