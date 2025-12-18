const express = require("express");
const router = express.Router();
const { voteRequest } = require("../controllers/voteController");
const { protect } = require("../middleware/authMiddleware"); // destructured

// POST /api/requests/:id/vote
router.post("/:id/vote", protect, voteRequest);

module.exports = router;
