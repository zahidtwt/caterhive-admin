import joi from 'joi';

const routineMenuValidatorSchema = joi.object({
  day: joi.string().min(3).max(255).required().label('Day'),
  dayMenu: joi.string().min(24).max(24).required().label('Day Menu'),
});

export default routineMenuValidatorSchema;
