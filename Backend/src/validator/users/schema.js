const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
  profilPicture: Joi.string(),
});

const updateProfileSchema = Joi.object({
  profilPicture: Joi.string().required(),
});

module.exports = { UserPayloadSchema, updateProfileSchema };
