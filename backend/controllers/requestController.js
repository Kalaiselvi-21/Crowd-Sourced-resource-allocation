const Request = require("../models/request");

exports.createRequest = async (req, res) => {
  try {
    const { resourceName, quantity, urgency, justification } = req.body;

    const finalScore = urgency * 2;

    const request = await Request.create({
      resourceName,
      quantity,
      urgency,
      justification,
      finalScore,
      requestedBy: req.user.id,
      status: "Pending"
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};
