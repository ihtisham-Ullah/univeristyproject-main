const mongoose = require("mongoose");
const Joi = require("joi");
const prioritySchema = mongoose.Schema(
  {
    priority: { type: String},
   
  },
  {
    collection: "TaskPriority",
  }
);

mongoose.model("TaskPriority", prioritySchema);

