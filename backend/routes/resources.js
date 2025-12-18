const express = require("express");
const { createResource, getAvailableResources } = require("../controllers/resourceController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, createResource);   // Admin only
router.get("/", protect, getAvailableResources);     // All users

module.exports = router;
