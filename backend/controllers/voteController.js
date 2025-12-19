const Request = require("../models/request");

exports.voteRequest = async (req, res) => {
  try {
    const { vote } = req.body;
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (typeof request.votes !== "number") {
      request.votes = 0;
    }
     if (request.votedUsers.includes(req.user.id)) {
      return res.status(400).json({ message: "You already voted" });
    }

    request.votes += vote;
    request.votedUsers.push(req.user.id);
    request.finalScore = request.urgency * 2 + request.votes;

    await request.save();
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
