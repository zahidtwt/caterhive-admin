import joi from 'joi';

const eventServiceValidatorSchema = joi.object({
  tier: joi.string().min(3).max(255).required().label('Day'),
  eventMenu: joi.string().min(24).max(24).required().label('Day Menu'),
});

export default eventServiceValidatorSchema;
