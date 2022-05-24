const InvariantError = require('../../exceptions/InvariantError');
const { PredictionPayloadSchema } = require('./schema');

const PredictionValidator = {
  validatePredictionPayload: (payload) => {
    const validationResult = PredictionPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PredictionValidator;

