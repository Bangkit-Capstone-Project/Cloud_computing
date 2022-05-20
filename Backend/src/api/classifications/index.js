const ClassificationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Classifications',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const classificationsHandler = new ClassificationHandler(service, validator);
    server.route(routes(classificationsHandler));
  },
};
