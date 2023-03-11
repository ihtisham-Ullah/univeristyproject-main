const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    userId: String,
    clockInTime: String,
    clockOutTime: String,
  },
  {
    collection: "clockins",
  }
);

mongoose.model("clockins", attendanceSchema);

