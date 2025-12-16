export default {
  routes: [
    { method: 'GET', path: '/representatives', handler: 'representative.find' },
    { method: 'GET', path: '/representatives/:id', handler: 'representative.findOne' },
    { method: 'POST', path: '/representatives', handler: 'representative.create' },
    { method: 'PUT', path: '/representatives/:id', handler: 'representative.update' },
    { method: 'DELETE', path: '/representatives/:id', handler: 'representative.delete' },
  ],
};