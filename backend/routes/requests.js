const express = require("express");
const { createRequest, getRequests }= require("../controllers/requestController");
const { voteRequest }= require("../controllers/voteController");
const { protect } = require("../middleware/authMiddleware");
const { getRankedRequests } = require("../controllers/rankingController");


const router = express.Router();

router.post("/", protect, createRequest);
router.get("/", protect, getRequests);
router.put("/:id/vote", protect, voteRequest);
router.get("/ranking", protect, getRankedRequests);


module.exports = router;
