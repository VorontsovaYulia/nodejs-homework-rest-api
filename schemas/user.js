const Joi = require("joi");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
});

const updateSubSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const updateAvatarSchema = Joi.object({
  avatar: { file: Joi.any() },
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubSchema,
  updateAvatarSchema,
};

module.exports = schemas;
