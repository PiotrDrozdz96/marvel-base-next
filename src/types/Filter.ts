type Filter = {
  id: string;
  name: string;
  checked: boolean;
};

type Filters = Filter & {
  series: Filter[];
};

export type { Filter, Filters };
