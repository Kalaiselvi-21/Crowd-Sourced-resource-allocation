const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const testRoutes = require("./routes/test");
app.use("/api/test", testRoutes);
const requestRoutes = require("./routes/requests");
app.use("/api/requests", requestRoutes);
const rankingRoutes = require("./routes/ranking");
app.use("/api/ranking", rankingRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);
const resourceRoutes = require("./routes/resources");
app.use("/api/resources", resourceRoutes);
const voteRoutes = require("./routes/votes");
app.use("/api/requests", voteRoutes);
