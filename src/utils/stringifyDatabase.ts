const stringifyDataBase = (value: unknown): string => {
  const test = JSON.stringify(value, null, 2);
  return test.replace(/\s+(?=[^[\]]*\])/gm, '');
};

export default stringifyDataBase;
