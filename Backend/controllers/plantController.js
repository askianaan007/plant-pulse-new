const Plant = require("../models/plantModel");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

//localhost:3000/api/v1/plants
exports.getPlant = async (req, res, next) => {
    const apiFeatures = new APIFeatures(Plant.find(), req.query).search().filter();
    const plants = await apiFeatures.query;
  res.status(200).json({
    success: "true",
    count: plants.length,
    plants,
  });
};

//localhost:3000/api/v1/plant/new
http: exports.newPlant = async (req, res, next) => {
  const plant = await Plant.create(req.body);
  res.status(201).json({
    success: true,
    plant,
  });
};

//get single plant - {{Base_url}}/api/v1/plant/6634ec47953fe0c881cdb8d0
exports.getSinglePlant = async (req, res, next) => {
  const plant = await Plant.findById(req.params.id);

  if (!plant) {
    return next(new ErrorHandler('Plant not found test',400));
  }
  res.status(201).json({
    success: true,
    plant,
  });
};


//update plant - http://localhost:3000/api/v1/plant/6634edfe59a6c310735ecc32

exports.updatePlant = async (req, res, next) => {
  let plant = await Plant.findById(req.params.id);
  if (!plant) {
    return res.status(404).json({
      success: false,
      message: "Plant not found",
    });
  }

    plant = await Plant.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    })

  res.status(200).json({
    success: true,
    plant,
  });
}; 

//delete plant

exports.deletePlant = async (req, res, next) => {
  let plant = await Plant.findById(req.params.id);
  if (!plant) {
    return res.status(404).json({
      success: false,
      message: "plant not found",
    });
  }

  await Plant.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "plant deleted",
  });
};
