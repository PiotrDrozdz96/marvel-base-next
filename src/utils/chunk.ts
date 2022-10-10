const chunk = <T>(array: T[], size: number): T[][] => {
  let index = 0;
  let resIndex = 0;

  const result = new Array(Math.ceil(array.length / size));

  while (index < array.length) {
    // eslint-disable-next-line no-plusplus
    result[resIndex++] = array.slice(index, (index += size));
  }

  return result;
};

export default chunk;
