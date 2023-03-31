const mongoose = require("mongoose");

const taskTypeSchema = mongoose.Schema(
  {
    type: { type: String },
  },
  {
    collection: "TaskType",
  }
);

mongoose.model("TaskType", taskTypeSchema);
