const InvariantError = require('../../exceptions/InvariantError');
const { DiseasePayloadSchema } = require('./schema');

const DiseaseValidator = {
  validateDiseasePayload: (payload) => {
    const validationResult = DiseasePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = DiseaseValidator;
