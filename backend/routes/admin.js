const express = require("express");
const { allocateResource } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/allocate/:id", protect, adminOnly, allocateResource);
module.exports = router;
