import joi from 'joi';

const eventMenuValidatorSchema = joi.object({
  caterer: joi.string().min(24).max(24).required().label('Caterer'),
  title: joi.string().min(3).max(255).required().label('Title'),
  appetizers: joi
    .array()
    .min(1)
    .items(joi.string().min(24).max(24))
    .required()
    .label('Appetizers'),
  mainCourses: joi
    .array()
    .min(1)
    .items(joi.string().min(24).max(24))
    .required()
    .label('Main Courses'),
  desserts: joi
    .array()
    .min(1)
    .items(joi.string().min(24).max(24))
    .required()
    .label('Desserts'),
  drinks: joi
    .array()
    .min(1)
    .items(joi.string().min(24).max(24))
    .required()
    .label('Drinks'),
  minEventOrder: joi
    .number()
    .default(0)
    .required()
    .label('Minimum Event Order'),
  discountOnEachHundred: joi
    .number()
    .default(0)
    .required()
    .label('Discount On Each Hundred'),
  maxDiscount: joi.number().default(0).required().label('Maximum Discount'),
});

export default eventMenuValidatorSchema;
