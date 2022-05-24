const routes = (handler) => [
  {
    method: 'POST',
    path: '/vegetables',
    handler: handler.postVegetableHandler,
  },
  {
    method: 'GET',
    path: '/vegetables',
    handler: handler.getVegetablesHandler,
  },
  {
    method: 'GET',
    path: '/vegetables/{id}',
    handler: handler.getVegetableByIdHandler,
  },
  {
    method: 'PUT',
    path: '/vegetables/{id}',
    handler: handler.putVegetableByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/vegetables/{id}',
    handler: handler.deleteVegetableByIdHandler,
  }
];

module.exports = routes;