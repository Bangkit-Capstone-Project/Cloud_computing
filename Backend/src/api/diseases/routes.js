const routes = (handler) => [
  {
    method: 'POST',
    path: '/diseases',
    handler: handler.postDiseaseHandler,
  },
  {
    method: 'GET',
    path: '/diseases',
    handler: handler.getDiseasesHandler,
  },
  {
    method: 'GET',
    path: '/diseases/{id}',
    handler: handler.getDiseaseByIdHandler,
  },
  {
    method: 'PUT',
    path: '/diseases/{id}',
    handler: handler.putDiseaseByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/diseases/{id}',
    handler: handler.deleteDiseaseByIdHandler,
  }
];

module.exports = routes;