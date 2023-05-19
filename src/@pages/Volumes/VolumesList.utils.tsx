import { ReactNode } from 'react';

import routes from 'config/routes';
import { Volume } from 'types/Volume';
import Image from '@components/Image';
import ActionsButtons from '@components/ActionsButtons';
import width from 'utils/width';
import dateFormat from 'utils/dateFormat';

export const getRows = (volumes: Volume[], databaseName: string) => {
  const rows: Record<number, ReactNode> = {};

  volumes.forEach((volume) => {
    rows[volume.id] = (
      <>
        <td style={width(100)}>{volume.id}</td>
        <td style={width(100)}>
          <Image src={volume.image_url} alt={volume.title} preset="mini" withLink />
        </td>
        <td style={width('33%')}>{volume.title}</td>
        <td style={width('66%')}>{volume.subtitle}</td>
        <td style={width(200)}>{dateFormat(volume.date)}</td>
        <ActionsButtons
          routeItem={routes.volumes}
          id={volume.id}
          resource="volumes"
          databaseName={databaseName}
          query={{ databaseName, id: volume.id }}
        />
      </>
    );
  });

  return rows;
};
