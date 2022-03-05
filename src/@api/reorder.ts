import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import JsonData from 'types/JsonData';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

type Props = {
  ids: number[];
};

const reorderApi =
  (databaseName: string, itemsName: string): ApiHandler =>
  async (req, res) =>
    new Promise((resolve) => {
      const body: Partial<Props> = JSON.parse(req.body);
      const { ids } = body;

      if (!ids) {
        resolve(res.status(400).send({ message: interpolate(messages.required, { field: 'ids' }) }));
        return;
      }
      if (!Array.isArray(ids)) {
        resolve(res.status(400).send({ message: interpolate(messages.mustBeType, { field: 'ids', type: 'Array' }) }));
        return;
      }

      fs.readFile(`src/database/${databaseName}.json`, 'utf8', (err, data) => {
        if (err) {
          resolve(res.status(404).json(err));
          return;
        }

        const parsedData = JSON.parse(data) as JsonData<string, { order: number }>;
        const items = parsedData[itemsName];

        ids.forEach((id, index) => {
          items[id].order = index;
        });

        const newDatabase = {
          [itemsName]: items,
          meta: parsedData.meta,
        };

        fs.writeFile(`src/database/${databaseName}.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
          if (writeErr) {
            resolve(res.status(500).json(writeErr));
            return;
          }
          resolve(
            res.status(200).json(
              ids.map((id) => ({
                ...items[id],
                id,
              }))
            )
          );
        });
      });
    });

export default reorderApi;
