type ApiSerie = {
  name: string;
  order: number;
  waveId: number;
};

type Serie = ApiSerie & {
  id: number;
};

export type { ApiSerie, Serie };
