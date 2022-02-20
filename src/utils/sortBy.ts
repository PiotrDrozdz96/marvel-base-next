// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortBy = <V extends Record<string, any>>(array: V[], key: string): V[] => array.sort((a, b) => a[key] - b[key]);

export default sortBy;
