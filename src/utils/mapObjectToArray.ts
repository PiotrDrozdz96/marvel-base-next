const mapObjectToArray = <D>(object: Record<string, D>): (D & { id: number })[] => {
  const keys = Object.keys(object);
  return keys.map((id) => ({ id: Number(id), ...object[id] }));
};

export default mapObjectToArray;
