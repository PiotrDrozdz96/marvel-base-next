const getSearchParams = (searchParams: string): Record<string, string> => {
  const urlParams = new URLSearchParams(searchParams);

  const result: Record<string, string> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of urlParams) {
    result[key] = value;
  }

  return result;
};

export default getSearchParams;
