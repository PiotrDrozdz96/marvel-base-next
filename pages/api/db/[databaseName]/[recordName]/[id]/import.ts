import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import JsonData from 'types/JsonData';
import { ApiNotebook } from 'types/Notebook';
import { ApiSerie } from 'types/Serie';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import pick from 'utils/pick';

const notebooksField: (keyof ApiNotebook)[] = ['title', 'vol', 'no', 'subtitle', 'image_url', 'date', 'serie_id'];
const requiredNotebooksField: (keyof ApiNotebook)[] = ['title', 'image_url', 'date', 'serie_id'];

const handler: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { id: reqId, databaseName, recordName } = req.query as Record<string, string>;

    if (recordName !== 'notebooks') {
      resolve(res.status(404).end());
      return;
    }

    if (req.method !== 'POST') {
      resolve(res.status(405).send({ message: messages.post }));
      return;
    }

    const body = JSON.parse(req.body);
    const bodyNotebooks = body.notebooks as ApiNotebook[] | undefined;

    if (!bodyNotebooks) {
      resolve(res.status(400).send({ message: interpolate(messages.required, { field: 'notebooks' }) }));
      return;
    }

    const pickedNotebooks = bodyNotebooks?.map((notebook) => pick(notebook, notebooksField));
    let invalidNotebook: ApiNotebook | undefined;
    const emptyField = requiredNotebooksField.find((key) =>
      pickedNotebooks?.find((notebook) => {
        const result = !notebook[key] && notebook[key] !== 0;
        if (result) {
          invalidNotebook = notebook;
        }
        return result;
      })
    );

    if (emptyField) {
      resolve(
        res
          .status(400)
          .send({ message: `${invalidNotebook?.no} - ${interpolate(messages.required, { field: emptyField })}` })
      );
      return;
    }

    fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (seriesErr, seriesData) => {
      if (seriesErr) {
        resolve(res.status(404).json(seriesErr));
        return;
      }

      const { series } = JSON.parse(seriesData) as JsonData<'series', ApiSerie>;
      if (reqId && !series[Number(reqId)]) {
        resolve(
          res.status(400).send({
            messages: interpolate(messages.relations, {
              field: 'serie_id',
              value: reqId,
              baseName: 'series',
            }),
          })
        );
        return;
      }

      fs.readFile(`src/database/db/${databaseName}/notebooks.json`, 'utf8', (err, data) => {
        if (err) {
          resolve(res.status(404).json(err));
          return;
        }

        const { notebooks, meta } = JSON.parse(data) as JsonData<'notebooks', ApiNotebook>;

        let id = meta.nextIndex;
        const newNotebooks: Record<number, ApiNotebook> = {};
        bodyNotebooks.forEach((notebook) => {
          newNotebooks[id] = { ...notebook, order: id - 1 };
          id += 1;
        });

        const newDatabase = {
          notebooks: {
            ...notebooks,
            ...newNotebooks,
          },
          meta: { nextIndex: id },
        };

        fs.writeFile(
          `src/database/db/${databaseName}/notebooks.json`,
          JSON.stringify(newDatabase, null, 2),
          (writeErr) => {
            if (writeErr) {
              resolve(res.status(500).json(writeErr));
              return;
            }
            resolve(res.status(200).json(newNotebooks));
          }
        );
      });
    });
  });

export default handler;
