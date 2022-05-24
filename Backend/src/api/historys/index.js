const HistorysHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'historys',
  version: '1.0.0',
  register: async (server, { historysService, diseasesService, plantsService, validator}) => {
    const historysHandler = new HistorysHandler(
      historysService, diseasesService, plantsService, validator,
    );

    server.route(routes(historysHandler));
  },
};
