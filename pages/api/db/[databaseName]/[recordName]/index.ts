import ApiHandler from 'types/ApiHandler';
import postAlias from '@api/post/postAlias';
import postSeries from '@api/post/postSeries';
import postVolumes from '@api/post/postVolumes';
import postWaves from '@api/post/postWaves';
import getSeries from '@api/get/getSeries';

import apiBuilder from 'utils/apiBuilder';
import notFound from 'utils/notFoundApiHandler';

type RecordName = 'waves' | 'series' | 'volumes' | 'aliases';

const recordsName = ['waves', 'series', 'volumes', 'aliases'];

const handlersMap: Record<RecordName, [ApiHandler, ApiHandler?, ApiHandler?]> = {
  waves: [postWaves],
  series: [postSeries, notFound, getSeries],
  volumes: [postVolumes],
  aliases: [postAlias],
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
