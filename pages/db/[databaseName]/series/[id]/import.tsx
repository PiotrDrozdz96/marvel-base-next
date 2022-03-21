// eslint-disable-next-line import/no-unresolved
import got from 'got';
import * as $ from 'cheerio';
import { isValid } from 'date-fns';

import { FrontSerie } from 'types/Serie';
import { ApiNotebook } from 'types/Notebook';
import FormPartial from 'types/FormPartial';
import AppServerSideProps from 'types/AppServerSideProps';
import getMenu from '@api/get/front/getMenu';
import getSerie from '@api/get/front/getSerie';
import parseDate from 'utils/parseDate';
import NotebooksImportList from '@pages/Notebooks/NotebooksImportList';

type Props = {
  databaseName: string;
  notebooks: FormPartial<ApiNotebook>[];
  item: FrontSerie;
};

export const getServerSideProps: AppServerSideProps<Props> = async ({ query }) => {
  const { databaseName, id, url, from, to } = query as Record<string, string>;

  const item = await getSerie(databaseName, Number(id));

  if (!item || !url?.startsWith('https://marvel.fandom.com/wiki/')) {
    return { notFound: true };
  }

  const response = await got.get(url);
  const $body = $.load(response.body);

  let notebooks: FormPartial<ApiNotebook>[] = [];
  // eslint-disable-next-line func-names
  $body('.wikia-gallery-item').each(function (_, el) {
    const $item = $.load(el);
    const imageUrl = $item('img').attr('data-src') || '';
    const name = $item('.lightbox-caption > center > div > span > a').attr('title') || '';
    const [, title, vol, no] = name.match(/([^\s]+)\sVol\s(\d+)\s(\d+)/) || [];
    const description = $item('center > div > span:nth-child(2)').text();
    const [, subtitle, , releaseDate, coverDate] =
      description.match(/("[^"]+")?(Release date: ([^,]+, \d\d\d\d))?Cover date: ([^,]+, \d\d\d\d)/) || [];
    const date = releaseDate ? parseDate(`${releaseDate}, 12:00`) : parseDate(`${coverDate}, 12:00`);
    notebooks.push({
      title: title || '',
      vol: vol || '',
      no: no || '',
      subtitle: subtitle || '',
      image_url: imageUrl || '',
      date: isValid(date) ? date.toISOString() : '',
      serie_id: id,
      order: '',
    });
  });

  if (from) {
    notebooks = notebooks.filter((notebook) => Number(notebook.no) >= Number(from));
  }

  if (to) {
    notebooks = notebooks.filter((notebook) => Number(notebook.no) <= Number(to));
  }

  const menu = await getMenu();

  return {
    props: {
      title: `- Seria - #${id} - Importuj`,
      menu,
      notebooks,
      databaseName,
      item,
    },
  };
};

const SeriesImportPage = ({ databaseName, notebooks, item }: Props) => (
  <NotebooksImportList databaseName={databaseName} notebooks={notebooks} serie={item} />
);

export default SeriesImportPage;
