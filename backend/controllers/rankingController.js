const Request = require("../models/request");

exports.getRankedRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .sort({ finalScore: -1, createdAt: 1 })
      .populate("requestedBy", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
