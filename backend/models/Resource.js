const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: true,
    unique: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Resource", resourceSchema);
