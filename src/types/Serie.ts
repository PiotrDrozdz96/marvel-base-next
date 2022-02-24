type ApiSerie = {
  name: string;
  order: number;
  wave_id: number;
};

type Serie = ApiSerie & {
  id: number;
};

export type { ApiSerie, Serie };
