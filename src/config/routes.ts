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
    },
  },
};

export default routes;
