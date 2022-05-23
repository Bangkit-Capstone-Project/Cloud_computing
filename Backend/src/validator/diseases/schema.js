const Joi = require('joi');

const DiseasePayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

module.exports = { DiseasePayloadSchema };