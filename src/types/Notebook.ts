export type ApiNotebook = {
  title: string;
  title_long: string;
  vol: string;
  no: string;
  subtitle: string;
  image_url: string;
  date: string;
};

export type Notebook = ApiNotebook & {
  id: number;
};
