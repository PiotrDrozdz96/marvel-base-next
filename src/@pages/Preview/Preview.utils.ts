import { Filters } from 'types/Filter';

const getNewList = (list: string[], id: string, checked: boolean): string[] =>
  checked ? list.filter((element) => element !== id) : [...list, id];

export const getSearchParams = (wavesIds: string[], seriesIds: string[]): string =>
  `${wavesIds.length ? `wavesIds=[${wavesIds.toString()}]` : ''}${wavesIds.length && seriesIds.length ? '&' : ''}${
    seriesIds.length ? `seriesIds=[${seriesIds.toString()}]` : ''
  }`;

const getCheckboxHref = (databaseName: string, alias: string, wavesIds: string[], seriesIds: string[]): string =>
  `/preview/${databaseName}${alias}?${getSearchParams(wavesIds, seriesIds)}`;

export const getWaveCheckboxHref = (
  databaseName: string,
  alias: string,
  filters: Filters[],
  wavesIds: string[],
  seriesIds: string[],
  checked: boolean,
  id: string
): string => {
  const newWavesIds = getNewList(wavesIds, id, checked);
  const seriesInsideWave = filters.find((filter) => filter.id === id)?.series.map((serie) => serie.id) || [];
  const newSeriesIds = checked ? seriesIds : seriesIds.filter((serieId) => !seriesInsideWave.includes(serieId));

  return getCheckboxHref(databaseName, alias, newWavesIds, newSeriesIds);
};

export const getSerieCheckboxHref = (
  databaseName: string,
  alias: string,
  filters: Filters[],
  wavesIds: string[],
  seriesIds: string[],
  checked: boolean,
  waveId: string,
  id: string
): string => {
  const wave = filters.find((filter) => filter.id === waveId);
  const seriesInsideWave = wave?.series.map((serie) => serie.id) || [];
  const checkAllWave = !checked && seriesIds.length + 1 === seriesInsideWave.length;
  const removeWaveCheck = checked && wave?.checked;

  const newWavesIds = !checkAllWave && !removeWaveCheck ? wavesIds : getNewList(wavesIds, waveId, checked);
  let newSeriesIds: string[] = [];

  if (checkAllWave) {
    newSeriesIds = seriesIds.filter((serieId) => !seriesInsideWave.includes(serieId));
  } else if (removeWaveCheck) {
    newSeriesIds = [...seriesIds, ...seriesInsideWave.filter((serieId) => serieId !== id)];
  } else {
    newSeriesIds = getNewList(seriesIds, id, checked);
  }

  return getCheckboxHref(databaseName, alias, newWavesIds, newSeriesIds);
};
