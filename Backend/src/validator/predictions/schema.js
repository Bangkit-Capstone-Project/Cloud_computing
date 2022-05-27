const Joi = require('joi');

const PredictionPayloadSchema = Joi.object({
  imgUrl: Joi.string().required(),
  endpoint: Joi.string().required(),
});

module.exports = { PredictionPayloadSchema };
