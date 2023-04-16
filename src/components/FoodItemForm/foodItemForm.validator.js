import joi from 'joi';

const foodItemValidatorSchema = joi.object({
  title: joi.string().min(3).max(255).required().label('Title'),
  imgUrl: joi.string().required().label('Image'),
  description: joi.string().min(3).max(255).required().label('Description'),
});

export default foodItemValidatorSchema;
