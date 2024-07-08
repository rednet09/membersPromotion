const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pool: { type: Number, default: 1 },
  joinedAt: { type: Date, default: Date.now },
  wallet: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
