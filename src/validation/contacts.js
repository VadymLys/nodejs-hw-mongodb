import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Username should be a string',
      'string.min': `Username should have at least ${3} characters`,
      'string.max': `Username should have at least ${20} characters`,
      'any.required': 'Username is required',
    }),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
  photo: Joi.string().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
  photo: Joi.string().optional(),
});
