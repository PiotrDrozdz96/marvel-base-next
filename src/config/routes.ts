const routes = {
  settings: {
    href: '/settings',
  },
  preview: {
    href: '/preview/[databaseName]',
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
  volumes: {
    id: {
      href: '/db/[databaseName]/volumes/[id]',
      show: {
        href: '/db/[databaseName]/volumes/[id]/show',
      },
    },
  },
  notebooks: {
    id: {
      href: '/db/[databaseName]/notebooks/[id]',
      show: {
        href: '/db/[databaseName]/notebooks/[id]/show',
      },
    },
  },
};

export default routes;
