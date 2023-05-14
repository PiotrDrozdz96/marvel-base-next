import { UrlObject } from 'url';

const stringifyHref = (urlObject: UrlObject): string => {
  let url = urlObject.pathname || '';
  const query = urlObject.query as Record<string, string>;
  Object.keys(query).forEach((key) => {
    if (url.includes(`[${key}]`)) {
      url = url.replace(`[${key}]`, query[key]);
    } else if (key === 'params') {
      url += `?${query[key]}`;
    } else if (!url.includes('?')) {
      url += `?${key}=${query[key]}`;
    } else {
      url += `&${key}=${query[key]}`;
    }
  });

  return url;
};

export default stringifyHref;
