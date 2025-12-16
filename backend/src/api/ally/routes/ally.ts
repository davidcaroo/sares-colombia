export default {
  routes: [
    {
      method: 'GET',
      path: '/allies',
      handler: 'ally.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/allies/:id',
      handler: 'ally.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/allies',
      handler: 'ally.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/allies/:id',
      handler: 'ally.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/allies/:id',
      handler: 'ally.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
