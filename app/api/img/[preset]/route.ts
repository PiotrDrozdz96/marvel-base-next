import { NextRequest } from 'next/server';
import sharp from 'sharp';

import ApiProps from 'types/ApiProps';
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

type Props = ApiProps<{ preset: Preset }>;

export const GET = async (request: NextRequest, { params }: Props) =>
  new Promise((resolve) => {
    const url = new URL(request.url).searchParams.get('url');
    const { preset } = params;

    if (!url) {
      resolve(new Response(interpolate(messages.required, { field: 'url' }), { status: 400 }));
      return;
    }

    if (!preset) {
      resolve(new Response(interpolate(messages.required, { field: 'preset' }), { status: 400 }));
      return;
    }

    if (!availablePresets.includes(preset as Preset)) {
      resolve(
        new Response(interpolate(messages.includes, { field: 'preset', options: availablePresets }), {
          status: 400,
        })
      );
      return;
    }

    fetchImage(url).then((image) => {
      if (image.status !== 200) {
        resolve(new Response(interpolate(messages.genericNotFound, { name: 'Image' }), { status: 400 }));
        return;
      }

      const pipeline = sharp(image.buffer);
      const { width, height } = dimensions[preset as Preset];

      pipeline.resize(width, height, { fit: 'outside' });

      pipeline.toBuffer((_, buffer) =>
        resolve(
          new Response(buffer, {
            headers: {
              'Cache-Control': 'public, max-age=31536000',
              'Content-Type': `image/${image.format}`,
            },
          })
        )
      );
    });
  });
