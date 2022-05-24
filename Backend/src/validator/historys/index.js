const InvariantError = require('../../exceptions/InvariantError');
const { HistoryPayloadSchema } = require('./schema');

const HistoryValidator = {
  validatePredictionHistorysPayload: (payload) => {
    const validationResult = HistoryPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = HistoryValidator;
