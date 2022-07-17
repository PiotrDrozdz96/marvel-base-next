type ApiNotebook = {
  title: string;
  vol: number;
  no: number;
  subtitle: string;
  image_url: string;
  date: string;
};

type Notebook = ApiNotebook & {
  id: number;
};

export type { ApiNotebook, Notebook };
