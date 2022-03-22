type ApiSerie = {
  name: string;
  order: number;
  wave_id: number;
  is_filter: boolean;
};

type Serie = ApiSerie & {
  id: number;
};

type FrontSerie = Serie & {
  waveName: string;
};

export type { ApiSerie, Serie, FrontSerie };
