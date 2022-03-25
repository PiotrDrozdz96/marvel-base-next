import fs from 'fs';

import ApiHandler from 'types/ApiHandler';
import { ApiSerie } from 'types/Serie';
import JsonData from 'types/JsonData';
import mapApiToFront from 'utils/mapApiToFront';

const getSeries: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { databaseName, wave_id: waveId } = req.query as Record<string, string>;

    fs.readFile(`src/database/db/${databaseName}/series.json`, 'utf8', (err, data) => {
      if (err) {
        resolve(res.status(404).json(err));
        return;
      }
      const { series } = JSON.parse(data) as JsonData<'series', ApiSerie>;
      const seriesArray = mapApiToFront(series);
      const result = seriesArray.filter((serie) => serie.wave_id === Number(waveId));

      resolve(res.status(200).json({ series: result }));
    });
  });

export default getSeries;
