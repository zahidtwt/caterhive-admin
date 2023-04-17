import joi from 'joi';

const dayMenuValidator = joi.object({
  title: joi.string().min(3).max(255).required().label('Title'),
  price: joi.number().required().label('Price'),
  menus: joi
    .array()
    .items(joi.string().min(24).max(24))
    .required()
    .label('menu'),
});

export default dayMenuValidator;
