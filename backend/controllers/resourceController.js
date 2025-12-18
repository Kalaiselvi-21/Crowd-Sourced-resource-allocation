const Resource = require("../models/Resource");

exports.createResource = async (req, res) => {
  try {
    const { resourceName, totalQuantity } = req.body;

    if (!resourceName || !totalQuantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const resource = await Resource.create({
      resourceName,
      totalQuantity,
      availableQuantity: totalQuantity
    });

    res.status(201).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailableResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      availableQuantity: { $gt: 0 }
    });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};
