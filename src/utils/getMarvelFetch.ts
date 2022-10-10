import { apiUrl } from 'consts/connect';
import { MarvelFandom } from 'types/MarvelFandom';
import chunk from 'utils/chunk';
import getFetch from 'utils/getFetch';

const limit = 50;

const getMarvelFetch = async <T extends MarvelFandom<unknown>>(
  allTitles: string[],
  params: Record<string, string>
): Promise<T> => {
  const results = await Promise.all(
    chunk(allTitles, limit).map((titles) =>
      getFetch<T>(apiUrl, {
        ...params,
        titles: titles.join('|'),
      })
    )
  );

  return {
    query: {
      pages: results.reduce((acc, cur) => ({ ...acc, ...cur.query?.pages }), {}),
    },
  } as T;
};

export default getMarvelFetch;
