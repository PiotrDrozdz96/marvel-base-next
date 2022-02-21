type ApiMenuItem = {
  name: string;
  type: 'SUB_MENU' | 'MAIN_MENU';
  order: number;
  url?: string;
  icon?: 'home' | 'tv' | 'reader';
  parent_id?: number;
};

type MenuItem = ApiMenuItem & {
  id: number;
  items: MenuItem[];
};

export type { ApiMenuItem, MenuItem };
