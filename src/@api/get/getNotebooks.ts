import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import { ApiNotebook } from 'types/Notebook';
import JsonData from 'types/JsonData';
import mapApiToFront from 'utils/mapApiToFront';

const getNotebooks: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { databaseName, serie_id: serieId } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/notebooks.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }
      const { notebooks } = JSON.parse(data) as JsonData<'notebooks', ApiNotebook>;
      const notebooksArray = mapApiToFront(notebooks);
      const result = notebooksArray.filter((notebook) => notebook.serie_id === Number(serieId));

      resolve(res.status(200).json({ notebooks: result }));
    });
  });

export default getNotebooks;
