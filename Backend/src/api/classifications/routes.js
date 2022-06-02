const routes = (handler) => [
  {
    method: 'POST',
    path: '/classifications',
    handler: handler.getClassificationHandler,
    options: {
      auth: 'tanaminapp_jwt',
    },
  }
];

module.exports = routes;