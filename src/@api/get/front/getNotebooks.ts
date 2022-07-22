import { MarvelFandomPageInfo, MarvelFandomImageInfo } from 'types/MarvelFandom';
import { Notebook } from 'types/Notebook';
import { apiUrl, nameRegExp } from 'consts/import';
import getFetch from 'utils/getFetch';
import mapObjectToArray from 'utils/mapObjectToArray';

const getParamFromContent = (content: string, key: string): string => {
  const [, value] = content.match(new RegExp(`${key}\\s*=([^\\n]*)\\n`)) || [];

  return value?.trim() || '';
};

const getDateFromContent = (content: string): string => {
  const releaseDate = getParamFromContent(content, 'ReleaseDate');
  if (releaseDate) {
    const [month, day, year] = releaseDate.split('-');
    return `${[year, `0${month}`.substring(month.length - 1), day].join('-')}T11:00:00.000Z`;
  }

  const [month, year] = [getParamFromContent(content, 'Month'), getParamFromContent(content, 'Year')];
  if (month && year) {
    return `${[year, `0${month}`.substring(month.length - 1), 1].join('-')}T11:00:00.000Z}`;
  }

  return '';
};

const mapNotebooks = (notebooksTitles: string[], pagesInfo?: Partial<MarvelFandomPageInfo>): Notebook[] => {
  if (!pagesInfo?.query?.pages) {
    return [];
  }
  const pages = mapObjectToArray(pagesInfo?.query.pages);
  return notebooksTitles
    .map((notebookTitle) => {
      const currentPage = pages.find((page) => page.title.replaceAll(' ', '_') === notebookTitle);
      if (!currentPage) {
        return undefined;
      }
      const content = currentPage.revisions[0].slots.main['*'];
      const [, title, vol, no] = currentPage.title.match(nameRegExp) || [];

      return {
        id: currentPage.id,
        title_long: notebookTitle,
        title,
        vol,
        no,
        subtitle: getParamFromContent(content, 'StoryTitle1'),
        image_url: getParamFromContent(content, 'Image1'),
        date: getDateFromContent(content),
      };
    })
    .filter((n) => n) as unknown as Notebook[];
};

const mapNotebooksImages = (notebooks: Notebook[], pagesImages?: Partial<MarvelFandomImageInfo>): Notebook[] => {
  const pages = pagesImages?.query?.pages ? mapObjectToArray(pagesImages.query.pages) : [];

  return notebooks.map((notebook) => {
    const imageTitle = `File:${notebook.image_url}`;
    const imageUrl = pages.find((page) => page.title === imageTitle)?.imageinfo[0].url || '';

    return { ...notebook, image_url: imageUrl };
  });
};

const getNotebooks = async (notebooksTitles: string[]): Promise<Notebook[]> => {
  const pagesInfo = await getFetch<MarvelFandomPageInfo>(apiUrl, {
    action: 'query',
    titles: notebooksTitles.join('|'),
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    format: 'json',
  });

  const notebooks = mapNotebooks(notebooksTitles, pagesInfo);

  const imagesInfo = await getFetch<MarvelFandomImageInfo>(apiUrl, {
    action: 'query',
    titles: notebooks.map((notebook) => `File:${notebook.image_url}`).join('|'),
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
  });

  return mapNotebooksImages(notebooks, imagesInfo);
};

export default getNotebooks;
