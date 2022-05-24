const VegetablesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'vegetables',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const vegetablesHandler = new VegetablesHandler(service, validator);
    server.route(routes(vegetablesHandler));
  },
};
