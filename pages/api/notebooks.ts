// eslint-disable-next-line import/no-unresolved
import got from 'got';
import * as $ from 'cheerio';
import { isValid } from 'date-fns';

import ApiHandler from 'types/ApiHandler';
import FormPartial from 'types/FormPartial';
import { ApiNotebook } from 'types/Notebook';
import { nameRegExp } from 'consts/import';
import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';
import parseDate from 'utils/parseDate';

export const handler: ApiHandler = async (req, res) =>
  new Promise((resolve) => {
    const { url, from, to } = req.query as Record<string, string>;

    if (req.method !== 'GET') {
      resolve(res.status(400).send(messages.get));
      return;
    }

    if (!url) {
      resolve(res.status(400).send(interpolate(messages.required, { field: 'url' })));
      return;
    }

    got.get(url).then((response) => {
      const $body = $.load(response.body);

      let notebooks: FormPartial<ApiNotebook>[] = [];
      // eslint-disable-next-line func-names
      $body('.wikia-gallery-item').each(function (_, el) {
        const $item = $.load(el);
        const imageUrl = $item('img').attr('data-src') || '';
        const name = $item('.lightbox-caption > center > div a').attr('title') || '';
        const [, title, vol, no] = name.match(nameRegExp) || [];
        const description = $item('center > div span:nth-child(2)').text();
        const [, subtitle, , releaseDate, coverDate] =
          description.match(/("[^"]+")?(Release date: ([^,]+, \d\d\d\d))?Cover date: ([^,]+, \d\d\d\d)/) || [];
        let date = releaseDate ? parseDate(`${releaseDate}, 12:00`) : parseDate(`${coverDate}, 12:00`);

        let alternativeSubtitle = '';

        if (!subtitle && !releaseDate && !coverDate) {
          alternativeSubtitle = $item('.lightbox-caption > div > i').text();
          const alternativeDate = $item('.lightbox-caption > div > a').text();
          date = parseDate(`${alternativeDate}, 12:00`);
        }

        notebooks.push({
          title: title || '',
          title_long: `${title}_Vol_${vol}_${no}`,
          vol: vol || '',
          no: no || '',
          subtitle: subtitle || alternativeSubtitle,
          image_url: imageUrl || '',
          date: isValid(date) ? date.toISOString() : '',
        });
      });

      if (from) {
        notebooks = notebooks.filter((notebook) => Number(notebook.no) >= Number(from));
      }

      if (to) {
        notebooks = notebooks.filter((notebook) => Number(notebook.no) <= Number(to));
      }

      resolve(res.status(200).json({ notebooks }));
    });
  });

export default handler;
