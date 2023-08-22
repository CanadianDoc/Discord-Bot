const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  msgId: String,
  arr: [{ userId: String, vote: String }],
});

module.exports = mongoose.model("Poll", pollSchema, "poll");
