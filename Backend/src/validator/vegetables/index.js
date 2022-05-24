const InvariantError = require('../../exceptions/InvariantError');
const { VegetablePayloadSchema } = require('./schema');

const VegetableValidator = {
  validateVegetablePayload: (payload) => {
    const validationResult = VegetablePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = VegetableValidator;
