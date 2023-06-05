'use server';

import fs from 'fs';

import JsonData from 'types/JsonData';
import { ApiMenuItem } from 'types/Menu';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const postMenu = (_: string, values: Partial<ApiMenuItem>, reqId?: number) =>
  new Promise((resolve) => {
    fs.readFile('src/database/menu.json', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const { menu, meta } = JSON.parse(data) as JsonData<'menu', ApiMenuItem>;
      if (values.parent_id && !menu[values.parent_id]) {
        throw new Error(
          interpolate(messages.relations, {
            field: 'parent_id',
            value: values.parent_id,
            baseName: 'menu',
          })
        );
      } else if (reqId && !menu[reqId as unknown as number]) {
        throw new Error(interpolate(messages.notFound, { id: reqId, baseName: 'menu' }));
      } else {
        const id = reqId || meta.nextIndex;
        const newDatabase = {
          menu: {
            ...menu,
            [id]: {
              ...values,
              order: values.order || meta.nextIndex - 1,
            },
          },
          meta: reqId ? meta : { nextIndex: meta.nextIndex + 1 },
        };
        fs.writeFile('src/database/menu.json', JSON.stringify(newDatabase, null, 2), (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }
          resolve({ ...values, id });
        });
      }
    });
  });

export default postMenu;
