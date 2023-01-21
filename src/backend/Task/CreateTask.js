const mongoose = require("mongoose");
const Joi = require("joi");

const createTaskSchema = new mongoose.Schema(
  {
    taskName: String,
    taskDescription: String,
    startDate: String,
    endDate: String,
    taskPriority: String,
    taskType: String,
    targetLocation: String,
    salespersonId: String,
  },
  {
    collection: "CreateTask",
  }
);
function validateTask(task) {
  const schema = Joi.object({
    taskName: Joi.string().min(2).max(50).required(),
    taskDescription: Joi.string().min(2).max(200).required(),
    startDate: Joi.string().min(2).max(25).required(),
    endDate: Joi.string().min(3).max(255).required(),
    taskPriority: Joi.string().min(2).max(50).required(),
    taskType: Joi.string().min(5).max(50).required(),
    targetLocation: Joi.string().min(5).max(200).required(),
    salespersonId: Joi.string().min(5).max(200).required(),
  });

  return schema.validate(task);
}
mongoose.model("CreateTask", createTaskSchema);
exports.validateTask = validateTask;
