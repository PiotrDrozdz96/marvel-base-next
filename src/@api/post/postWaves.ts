import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import { ApiWave } from 'types/Wave';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import pick from 'utils/pick';
import JsonData from 'types/JsonData';

const wavesField: (keyof ApiWave)[] = ['name', 'order'];
const wavesRequiredFields: (keyof ApiWave)[] = ['name'];

const postWaves: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { id: reqId, databaseName } = req.query as Record<string, string>;
    const body: Partial<ApiWave> = pick(JSON.parse(req.body), wavesField);
    const emptyField = wavesRequiredFields.find((key) => !body[key] && body[key] !== 0);

    if (emptyField) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: emptyField }) }));
      return;
    }

    fs.readFile(`src/database/db/${databaseName}/waves.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }

      const { waves, meta } = JSON.parse(data) as JsonData<'waves', ApiWave>;
      if (reqId && !waves[reqId as unknown as number]) {
        resolve(
          res
            .status(404)
            .send({ message: interpolate(messages.notFound, { id: reqId, baseName: `${databaseName}/waves` }) })
        );
        return;
      }

      const id = reqId || meta.nextIndex;

      const newDatabase = {
        waves: {
          ...waves,
          [id]: {
            ...body,
            order: body.order || meta.nextIndex - 1,
          },
        },
        meta: reqId ? meta : { nextIndex: meta.nextIndex + 1 },
      };

      fs.writeFile(`src/database/db/${databaseName}/waves.json`, JSON.stringify(newDatabase, null, 2), (writeErr) => {
        if (writeErr) {
          resolve(res.status(500).json(writeErr));
          return;
        }
        resolve(res.status(200).json({ ...body, id }));
      });
    });
  });

export default postWaves;
