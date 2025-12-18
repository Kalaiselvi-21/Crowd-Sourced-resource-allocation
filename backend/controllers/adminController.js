const Request = require("../models/request");
const Resource = require("../models/Resource");

exports.allocateResource = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    const resource = await Resource.findOne({ name: request.resourceName });
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (resource.availableQuantity < request.quantity) {
      request.status = "Rejected";
      await request.save();
      return res.json({ message: "Insufficient resources. Request rejected." });
    }

    // Allocate
    resource.availableQuantity -= request.quantity;
    request.status = "Approved";
    request.allocatedAt = new Date();

    await resource.save();
    await request.save();

    res.json({ message: "Resource allocated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
