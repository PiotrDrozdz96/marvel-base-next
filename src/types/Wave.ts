type ApiWave = {
  name: string;
  order: number;
};

type Wave = ApiWave & {
  id: number;
};

export type { ApiWave, Wave };
