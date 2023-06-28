const { BadRequest, Conflict } = require("http-errors");
const catchAsync = require("../catchAsync");
const { Dog } = require("../../models");
const Joi = require("joi");

const addDogSchema = Joi.object({
  name: Joi.string().max(250).required(),
  color: Joi.string().max(250).required(),
  tail_length: Joi.number().min(0).required(),
  weight: Joi.number().min(0.1).required(),
});

const validateAddDog = catchAsync(async (req, res, next) => {
  const { error, value } = addDogSchema.validate(req.body);

  if (error) return next(BadRequest(error.details[0].message));

  const existedDog = await Dog.findAll({ where: { name: req.body.name } });
  console.log(existedDog);
  if (existedDog.length > 0) {
    return next(Conflict("This Dog name is already taken!"));
  }

  req.body = value;

  next();
});

module.exports = validateAddDog;
