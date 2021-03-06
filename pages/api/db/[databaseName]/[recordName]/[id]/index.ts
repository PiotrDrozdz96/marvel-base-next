import deleteSeries from '@api/delete/deleteSeries';
import deleteVolumes from '@api/delete/deleteVolumes';
import deleteWaves from '@api/delete/deleteWaves';
import deleteAlias from '@api/delete/deleteAlias';
import postSeries from '@api/post/postSeries';
import postVolumes from '@api/post/postVolumes';
import postWaves from '@api/post/postWaves';
import ApiHandler from 'types/ApiHandler';
import apiBuilder from 'utils/apiBuilder';
import notFound from 'utils/notFoundApiHandler';

type RecordName = 'waves' | 'series' | 'volumes' | 'aliases';

const recordsName = ['waves', 'series', 'volumes', 'aliases'];

const handlersMap: Record<RecordName, [ApiHandler, ApiHandler]> = {
  waves: [postWaves, deleteWaves],
  series: [postSeries, deleteSeries],
  volumes: [postVolumes, deleteVolumes],
  aliases: [notFound, deleteAlias],
};

const handler: ApiHandler = async (req, res) => {
  const name = req.query.recordName as string;
  if (!recordsName.includes(name)) {
    return notFound(req, res);
  }

  return apiBuilder(...handlersMap[name as RecordName])(req, res);
};

export default handler;
