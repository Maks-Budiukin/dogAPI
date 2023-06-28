const catchAsync = require("../../services/catchAsync");
const { Dog } = require("../../models");

const addDog = catchAsync(async (req, res, next) => {
  const { name, color, tail_length, weight } = req.body;

  const dog = await Dog.create({
    name,
    color,
    tail_length,
    weight,
  });

  res.status(201).json(dog);
});

module.exports = addDog;
