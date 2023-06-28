const catchAsync = require("../../services/catchAsync");
const { Dog } = require("../../models");

const getDogs = catchAsync(async (req, res) => {
  const { attribute, order, pageNumber, pageSize } = req.query;

  const orderParams = [];
  if (attribute && order) {
    orderParams.push([attribute, order]);
  }

  const reqPageNumber = parseInt(pageNumber) || 1;

  const limit = parseInt(pageSize) || 10;

  const offset = parseInt(reqPageNumber - 1) * limit;

  const dogs = await Dog.findAll({
    order: orderParams,
    offset,
    limit,
  });

  res.json(dogs);
});

module.exports = getDogs;
