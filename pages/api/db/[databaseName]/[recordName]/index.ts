import ApiHandler from 'types/ApiHandler';
import postAlias from '@api/post/postAlias';
import postNotebooks from '@api/post/postNotebooks';
import postSeries from '@api/post/postSeries';
import postVolumes from '@api/post/postVolumes';
import postWaves from '@api/post/postWaves';

import apiBuilder from 'utils/apiBuilder';

type RecordName = 'waves' | 'series' | 'volumes' | 'notebooks' | 'aliases';

const recordsName = ['waves', 'series', 'volumes', 'notebooks', 'aliases'];

const handlersMap: Record<RecordName, ApiHandler> = {
  waves: postWaves,
  series: postSeries,
  volumes: postVolumes,
  notebooks: postNotebooks,
  aliases: postAlias,
};

const handler: ApiHandler = async (req, res) => {
  const name = req.query.recordName as string;
  if (!recordsName.includes(name)) {
    return new Promise((resolve) => {
      resolve(res.status(404).end());
    });
  }

  return apiBuilder(handlersMap[name as RecordName])(req, res);
};

export default handler;
