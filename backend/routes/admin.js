const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const { allocateResource } = require("../controllers/adminController");

const router = express.Router();

router.put("/allocate/:id", protect, isAdmin, allocateResource);

module.exports = router;
