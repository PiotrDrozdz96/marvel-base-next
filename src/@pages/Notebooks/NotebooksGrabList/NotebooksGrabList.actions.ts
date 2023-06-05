'use server';

import { unstable_cache as unstableCache } from 'next/cache';
// eslint-disable-next-line import/no-unresolved
import got from 'got';
import * as $ from 'cheerio';
import { isValid } from 'date-fns';

import { ApiNotebook } from 'types/Notebook';
import { nameRegExp } from 'consts/connect';
import parseDate from 'utils/parseDate';

import { FormValues } from './NotebooksGrabList.types';

const grabAllNotebooks = unstableCache(
  (url: string): Promise<ApiNotebook[]> =>
    new Promise((resolve) => {
      try {
        got.get(url).then((response) => {
          const $body = $.load(response.body);

          const notebooks: ApiNotebook[] = [];
          // eslint-disable-next-line func-names
          $body('.wikia-gallery-item').each(function (_, el) {
            const $item = $.load(el);
            const imageUrl = $item('img').attr('data-src') || '';
            const $anchor = $item('.lightbox-caption > center > div a');
            const name = $anchor.attr('title') || '';
            const href = ($anchor.attr('href') || '').replace('/wiki/', '');
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
              title_long: href,
              vol: vol || '',
              no: no || '',
              subtitle: subtitle || alternativeSubtitle,
              image_url: imageUrl || '',
              date: isValid(date) ? date.toISOString() : '',
            });
          });

          resolve(notebooks);
        });
      } catch (e) {
        resolve([]);
      }
    }),
  undefined,
  { revalidate: 3600 }
);

export const grabNotebooks = async ({ url, from, to }: FormValues): Promise<ApiNotebook[]> => {
  let notebooks: ApiNotebook[] = await grabAllNotebooks(url);

  if (from) {
    notebooks = notebooks.filter((notebook) => Number(notebook.no) >= Number(from));
  }

  if (to) {
    notebooks = notebooks.filter((notebook) => Number(notebook.no) <= Number(to));
  }

  return notebooks;
};
