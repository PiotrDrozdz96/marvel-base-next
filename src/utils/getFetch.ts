const getFetch = async <T extends Record<string, unknown>>(
  url: string,
  params: Record<string, string>
): Promise<Partial<T>> => {
  const response = await fetch(`${url}?${new URLSearchParams(params)}`, { method: 'GET' });
  if (response.status !== 200) {
    return {};
  }

  const result = await response.json();
  return result;
};

export default getFetch;
