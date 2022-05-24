const routes = (handler) => [
  {
    method: 'POST',
    path: '/plants',
    handler: handler.postPlantHandler,
  },
  {
    method: 'GET',
    path: '/plants',
    handler: handler.getPlantsHandler,
  },
  {
    method: 'GET',
    path: '/plants/{id}',
    handler: handler.getPlantByIdHandler,
  },
  {
    method: 'PUT',
    path: '/plants/{id}',
    handler: handler.putPlantByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/plants/{id}',
    handler: handler.deletePlantByIdHandler,
  }
];

module.exports = routes;