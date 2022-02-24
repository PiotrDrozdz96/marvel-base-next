const routes = {
  settings: {
    href: '/settings',
  },
  menu: {
    id: {
      href: '/menu/[id]',
      show: {
        href: '/menu/[id]/show',
      },
    },
  },
  db: {
    id: {
      href: '/db/[databaseName]',
      show: {
        href: '/db/[databaseName]/show',
      },
    },
  },
  waves: {
    id: {
      href: '/db/[databaseName]/waves/[id]',
      show: {
        href: '/db/[databaseName]/waves/[id]/show',
      },
    },
  },
  series: {
    id: {
      href: '/db/[databaseName]/series/[id]',
      show: {
        href: '/db/[databaseName]/series/[id]/show',
      },
    },
  },
};

export default routes;
