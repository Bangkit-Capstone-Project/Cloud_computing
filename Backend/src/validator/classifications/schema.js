const Joi = require('joi');

const ClassificationPayloadSchema = Joi.object({
  imgUrl: Joi.string().required(),
  endpoint: Joi.string().required()
});

module.exports = { ClassificationPayloadSchema };
