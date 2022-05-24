const routes = (handler) => [
  {
    method: 'POST',
    path: '/predict/historys',
    handler: handler.postPredictionHistorysHandler,
    options: {
      auth: 'tanaminapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/predict/historys',
    handler: handler.getPredictionHistoryHandler,
    options: {
      auth: 'tanaminapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/predict/historys/{id}',
    handler: handler.getPredictionHistoryById,
    options: {
      auth: 'tanaminapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/predict/historys/plant/{plantsId}',
    handler: handler.getPredictionHistorysByPlantIdHandler,
    options: {
      auth: 'tanaminapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/predict/historys/plant/{plantsId}/disease/{diseaseId}',
    handler: handler.getPredictionHistorysByPlantIdDiseaseIdHandler,
    options: {
      auth: 'tanaminapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/predict/historys/{id}',
    handler: handler.deletePredictionHistoryById,
    options: {
      auth: 'tanaminapp_jwt',
    },
  },
];

module.exports = routes;
