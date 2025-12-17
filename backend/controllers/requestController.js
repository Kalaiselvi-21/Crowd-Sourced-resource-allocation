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
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
