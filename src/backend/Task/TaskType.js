const mongoose = require("mongoose");
const Joi = require("joi");
const taskTypeSchema = mongoose.Schema(
  {
    type: { type: String },
  },
  {
    collection: "TaskType",
  }
);

mongoose.model("TaskType", taskTypeSchema);
