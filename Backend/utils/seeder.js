const plants = require("../data/plant.json");
const plant = require("../models/plantModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/db");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();

const seedPlants = async () => {
  try {
    await plant.deleteMany();
    console.log("plants deleted");
    await plant.insertMany(plants);
    console.log("plants inserted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedPlants();
