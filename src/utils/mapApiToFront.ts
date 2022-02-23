import mapObjectToArray from './mapObjectToArray';
import sortBy from './sortBy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapApiToFront = <V>(body: Record<number, V>, order = 'order'): (V & { id: number })[] =>
  sortBy(mapObjectToArray(body), order);

export default mapApiToFront;
