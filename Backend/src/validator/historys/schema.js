const Joi = require('joi');

const HistoryPayloadSchema = Joi.object({
  diseaseId: Joi.string().required(),
  plantId: Joi.string().required(),
  imageUrl: Joi.string().required(),
  accuracy: Joi.number().required(),
});

module.exports = { HistoryPayloadSchema };