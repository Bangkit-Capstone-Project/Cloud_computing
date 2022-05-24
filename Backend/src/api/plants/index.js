const PlantsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'plants',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const plantsHandler = new PlantsHandler(service, validator);
    server.route(routes(plantsHandler));
  },
};
