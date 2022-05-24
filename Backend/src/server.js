require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');


// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const classifications = require('./api/classifications');
const ClassificationsService = require('./services/googleai/ClassificationsService');
const ClassificationValidator = require('./validator/classifications');

const diseases = require('./api/Diseases');
const DiseasesService = require('./services/postgres/DiseasesService');
const DiseasesValidator = require('./validator/diseases');

const plants = require('./api/Plants');
const PlantsService = require('./services/postgres/PlantsService');
const PlantsValidator = require('./validator/plants');

const vegetables = require('./api/Vegetables');
const VegetablesService = require('./services/postgres/VegetablesService');
const VegetablesValidator = require('./validator/vegetables');

const predictions = require('./api/predictions');
const PredictionsService = require('./services/googleai/PredictionsService');
const PredictionValidator = require('./validator/Predictions');

const historys = require('./api/historys');
const HistorysService = require('./services/postgres/HistorysService');
const HistoryValidator = require('./validator/historys');

const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const classificationsService = new ClassificationsService();
  const diseasesService = new DiseasesService();
  const plantsService = new PlantsService();
  const vegetablesService = new VegetablesService();
  const predictionsService = new PredictionsService();
  const historysService = new HistorysService();

  const server = new Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      }
    }
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('tanaminapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: classifications,
      options: {
        service: classificationsService,
        validator: ClassificationValidator,
      },
    },
    {
      plugin: predictions,
      options: {
        service: predictionsService,
        validator: PredictionValidator,
      },
    },
    {
      plugin: diseases,
      options: {
        service: diseasesService,
        validator: DiseasesValidator,
      },
    },
    {
      plugin: plants,
      options: {
        service: plantsService,
        validator: PlantsValidator,
      },
    },
    {
      plugin: vegetables,
      options: {
        service: vegetablesService,
        validator: VegetablesValidator,
      },
    },
    {
      plugin: historys,
      options: {
        historysService,
        diseasesService,
        plantsService,
        validator: HistoryValidator,
      },
    }
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

init();