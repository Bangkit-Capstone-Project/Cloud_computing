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
    },
  }
];

module.exports = routes;