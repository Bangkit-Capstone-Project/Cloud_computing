const InvariantError = require('../../exceptions/InvariantError');
const { ClassificationPayloadSchema } = require('./schema');

const ClassificationValidator = {
  validateClassificationPayload: (payload) => {
    const validationResult = ClassificationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ClassificationValidator;
