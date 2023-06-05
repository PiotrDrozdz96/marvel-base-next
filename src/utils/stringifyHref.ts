import { UrlObject } from 'url';

const stringifyHref = (urlObject: UrlObject): string => {
  let url = urlObject.pathname || '';
  const { query } = urlObject;
  if (typeof query === 'object' && query !== null) {
    Object.keys(query).forEach((key) => {
      if (url.includes(`[${key}]`)) {
        url = url.replace(`[${key}]`, query[key] as string);
      } else if (key === 'params') {
        url += `?${query[key]}`;
      } else if (!url.includes('?')) {
        url += `?${key}=${query[key]}`;
      } else {
        url += `&${key}=${query[key]}`;
      }
    });
  }

  return url;
};

export default stringifyHref;
