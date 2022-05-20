const routes = (handler) => [
  {
    method: 'POST',
    path: '/classifications',
    handler: handler.getClassificationHandler,
    options: {
      auth: 'tanaminapp_jwt',
      payload: {
        allow: 'multipart/form-data',
        maxBytes: 10000000,
        output: 'stream',
        multipart: true,
      },
    },
  }
];

module.exports = routes;