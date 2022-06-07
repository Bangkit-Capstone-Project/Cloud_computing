const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'POST',
    path: '/authentications/delete',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
