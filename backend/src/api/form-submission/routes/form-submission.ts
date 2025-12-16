export default {
  routes: [
    {
      method: 'POST',
      path: '/forms/:type',
      handler: 'form-submission.submit',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
