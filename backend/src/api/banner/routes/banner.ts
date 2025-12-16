export default {
  routes: [
    { method: 'GET', path: '/banners', handler: 'banner.find' },
    { method: 'GET', path: '/banners/:id', handler: 'banner.findOne' },
    { method: 'POST', path: '/banners', handler: 'banner.create' },
    { method: 'PUT', path: '/banners/:id', handler: 'banner.update' },
    { method: 'DELETE', path: '/banners/:id', handler: 'banner.delete' },
  ],
};