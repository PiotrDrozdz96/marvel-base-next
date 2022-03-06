import deleteNotebooks from '@api/delete/deleteNotebooks';
import deleteSeries from '@api/delete/deleteSeries';
import deleteVolumes from '@api/delete/deleteVolumes';
import deleteWaves from '@api/delete/deleteWaves';
import postNotebooks from '@api/post/postNotebooks';
import postSeries from '@api/post/postSeries';
import postVolumes from '@api/post/postVolumes';
import postWaves from '@api/post/postWaves';
import ApiHandler from 'types/ApiHandler';
import apiBuilder from 'utils/apiBuilder';

type RecordName = 'waves' | 'series' | 'volumes' | 'notebooks';

const recordsName = ['waves', 'series', 'volumes', 'notebooks'];

const handlersMap: Record<RecordName, [ApiHandler, ApiHandler]> = {
  waves: [postWaves, deleteWaves],
  series: [postSeries, deleteSeries],
  volumes: [postVolumes, deleteVolumes],
  notebooks: [postNotebooks, deleteNotebooks],
};

const handler: ApiHandler = async (req, res) => {
  const name = req.query.recordName as string;
  if (!recordsName.includes(name)) {
    return new Promise((resolve) => {
      resolve(res.status(404).end());
    });
  }

  return apiBuilder(...handlersMap[name as RecordName])(req, res);
};

export default handler;
