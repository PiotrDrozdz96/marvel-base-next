type ApiVolume = {
  title: string;
  subtitle: string;
  image_url: string;
  date: string;
  serie_id: number;
  order: number;
  global_order: number;
  notebooks_ids: number[];
  is_event?: true;
  event_id?: number;
};

type Volume = ApiVolume & {
  id: number;
};

type FrontVolume = Volume & {
  serieName: string;
};

export type { ApiVolume, Volume, FrontVolume };
