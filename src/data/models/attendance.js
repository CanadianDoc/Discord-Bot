const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  msgId: String,
  arr: [{ userId: String, vote: String, username: String }],
});

module.exports = mongoose.model("Attendance", attendanceSchema, "attendance");
