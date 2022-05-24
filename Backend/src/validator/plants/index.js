const InvariantError = require('../../exceptions/InvariantError');
const { PlantPayloadSchema } = require('./schema');

const PlantValidator = {
  validatePlantPayload: (payload) => {
    const validationResult = PlantPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlantValidator;
