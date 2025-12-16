export default {
  routes: [
    { method: 'GET', path: '/site-setting', handler: 'site-setting.find' },
    { method: 'PUT', path: '/site-setting', handler: 'site-setting.update' },
    { method: 'DELETE', path: '/site-setting', handler: 'site-setting.delete' },
  ],
};