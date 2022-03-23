import { Notebook } from 'types/Notebook';

type ApiVolume = {
  title: string;
  subtitle: string;
  image_url: string;
  date: string;
  serie_id: number;
  order: number;
  global_order: number;
  notebooks_ids: number[];
};

type Volume = ApiVolume & {
  id: number;
};

type FrontVolume = Volume & {
  serieName: string;
  notebooks: Notebook[];
};

export type { ApiVolume, Volume, FrontVolume };
