const Joi = require('joi');

const PlantPayloadSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

module.exports = { PlantPayloadSchema };