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
      href: '/db/[id]',
      show: {
        href: '/db/[id]/show',
      },
    },
  },
};

export default routes;
