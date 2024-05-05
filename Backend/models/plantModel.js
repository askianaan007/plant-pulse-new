const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please entre the plant name"],
    trim: true,
    maxLength: [50, "plant name cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: [true, "please entre the plant description"],
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  waterLevel: {
    type:String
  }
});

let schema = mongoose.model("Plant", plantSchema);

module.exports = schema;