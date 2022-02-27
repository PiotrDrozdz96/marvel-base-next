import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import JsonData from 'types/JsonData';
import { ApiMenuItem } from 'types/Menu';
import menuValidation from 'utils/apiValidators/menu';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const postMenu: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { id: reqId } = req.query as Record<string, string>;

    const body: Partial<ApiMenuItem> = JSON.parse(req.body);
    const values = menuValidation(res, body);

    if (!values) {
      resolve(res.end());
      return;
    }

    fs.readFile('src/database/menu.json', 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { menu, meta } = JSON.parse(data) as JsonData<'menu', ApiMenuItem>;
      if (values.parent_id && !menu[values.parent_id]) {
        resolve(
          res.status(400).send({
            messages: interpolate(messages.relations, {
              field: 'parent_id',
              value: body.parent_id,
              baseName: 'menu',
            }),
          })
        );
      } else if (reqId && !menu[reqId as unknown as number]) {
        resolve(res.status(404).send({ message: interpolate(messages.notFound, { id: reqId, baseName: 'menu' }) }));
      } else {
        const id = reqId || meta.nextIndex;
        const newDatabase = {
          menu: {
            ...menu,
            [id]: values,
          },
          meta: reqId ? meta : { nextIndex: meta.nextIndex + 1 },
        };
        fs.writeFile('src/database/menu.json', JSON.stringify(newDatabase, null, 2), (writeErr) => {
          if (err) {
            resolve(res.status(500).json(writeErr));
            return;
          }
          resolve(res.status(200).json({ ...values, id }));
        });
      }
    });
  });

export default postMenu;
