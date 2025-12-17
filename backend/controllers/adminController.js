const Request = require("../models/request");

exports.allocateResource = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "approved";
    await request.save();

    res.json({ message: "Resource allocated", request });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
