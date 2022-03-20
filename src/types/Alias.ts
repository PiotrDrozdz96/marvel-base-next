type ApiAlias = {
  params: string;
};

type Alias = ApiAlias & {
  name: string;
};

export type { ApiAlias, Alias };
