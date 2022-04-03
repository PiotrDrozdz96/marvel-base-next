type Filter = {
  id: string;
  name: string;
  checked: boolean;
};

type Filters = Filter & {
  hide?: boolean;
  series: Filter[];
};

export type { Filter, Filters };
