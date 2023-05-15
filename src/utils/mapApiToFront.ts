import mapObjectToArray from './mapObjectToArray';
import sortBy from './sortBy';

const mapApiToFront = <V>(body: Record<number, V>, order = 'order'): (V & { id: number })[] =>
  sortBy(mapObjectToArray(body), order);

export default mapApiToFront;
