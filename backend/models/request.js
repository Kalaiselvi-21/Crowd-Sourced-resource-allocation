const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    resourceName: { type: String, required: true },
    quantity: { type: Number, required: true },
    urgency: { type: Number, min: 1, max: 5, required: true },
    justification: String,
    votes: { type: Number, default: 0 },
    finalScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
