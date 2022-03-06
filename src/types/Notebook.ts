type ApiNotebook = {
  title: string;
  vol: number;
  no: number;
  subtitle: string;
  image_url: string;
  date: string;
  serie_id: number;
  order: number;
};

type Notebook = ApiNotebook & {
  id: number;
};

type FrontNotebook = Notebook & {
  serieName: string;
};

export type { ApiNotebook, Notebook, FrontNotebook };
