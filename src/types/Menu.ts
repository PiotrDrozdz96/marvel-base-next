type ApiMenuItem = {
  name: string;
  type: 'SUB_MENU' | 'MAIN_MENU';
  order: number;
  url?: string;
  icon?: 'home' | 'tv' | 'reader';
  parent_id?: number;
};

type MenuItem = Omit<ApiMenuItem, 'parent_id'> & {
  id: number;
  items?: MenuItem[];
};

export type { ApiMenuItem, MenuItem };
