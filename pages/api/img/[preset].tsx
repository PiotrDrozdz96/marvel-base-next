import sharp from 'sharp';

import ApiHandler from 'types/ApiHandler';
import { Preset } from 'types/Image';
import { dimensions } from 'consts/presets';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const availablePresets: Preset[] = ['mini', 'preview', 'thumb'];

const fetchImage = async (url: string) => {
  try {
    const fetchReq = await fetch(url, { method: 'GET' });

    let format = url.split('.').pop();
    if (fetchReq.headers.has('content-type') && fetchReq.headers.get('content-type')?.startsWith('image/')) {
      format = fetchReq.headers.get('content-type')?.replace('image/', '');
    }

    return {
      status: fetchReq.status,
      buffer: Buffer.from(await fetchReq.arrayBuffer()),
      format,
    };
  } catch (e) {
    return { status: 500 };
  }
};

export const handler: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { preset, url } = req.query as Record<string, string>;

    if (req.method !== 'GET') {
      resolve(res.status(400).send(messages.get));
      return;
    }

    if (!url) {
      resolve(res.status(400).send(interpolate(messages.required, { field: 'url' })));
      return;
    }

    if (!preset) {
      resolve(res.status(400).send(interpolate(messages.required, { field: 'preset' })));
      return;
    }

    if (!availablePresets.includes(preset as Preset)) {
      resolve(res.status(400).send(interpolate(messages.includes, { field: 'preset', options: availablePresets })));
      return;
    }

    fetchImage(url).then((image) => {
      if (image.status !== 200) {
        resolve(res.status(400).send(interpolate(messages.genericNotFound, { name: 'Image' })));
        return;
      }

      const pipeline = sharp(image.buffer);
      const { width, height } = dimensions[preset as Preset];

      pipeline.resize(width, height, { fit: 'outside' });

      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('Content-Type', `image/${image.format}`);
      pipeline.toBuffer((_, buffer) => resolve(res.end(buffer, 'binary')));
    });
  });

export default handler;
