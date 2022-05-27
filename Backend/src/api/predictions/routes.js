const routes = (handler) => [
  {
    method: 'POST',
    path: '/predictions/rice',
    handler: handler.getRicePredictionHandler,
    options: {
      auth: 'tanaminapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/predictions/cassava',
    handler: handler.getCassavaPredictionHandler,
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