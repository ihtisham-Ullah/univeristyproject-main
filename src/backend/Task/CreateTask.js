// const mongoose = require("mongoose");
// const Joi = require("joi");

// const createTaskSchema = new mongoose.Schema(
//   {
//     taskName: String,
//     taskDescription: String,
//     startDate: String,
//     endDate: String,
//     taskPriority: String,
//     taskType: String,
//     targetLocation: String,
//     salespersonId: String,
//     firstName: String,
//   },
//   {
//     collection: "CreateTask",
//   }
// );
// function validateTask(task) {
//   const schema = Joi.object({
//     taskName: Joi.string().min(2).max(50).required(),
//     taskDescription: Joi.string().min(2).max(200).required(),
//     startDate: Joi.string().min(2).max(25).required(),
//     endDate: Joi.string().min(3).max(255).required(),
//     taskPriority: Joi.string().min(2).max(50).required(),
//     taskType: Joi.string().min(5).max(50).required(),
//     targetLocation: Joi.string().min(5).max(200).required(),
//     salespersonId: Joi.string().min(0).max(200).required(),
//     firstName: Joi.string().min(1).max(200).required(),
//   });

//   return schema.validate(task);
// }
// mongoose.model("CreateTask", createTaskSchema);
// exports.validateTask = validateTask;

const mongoose = require("mongoose");
const Joi = require("joi");

const targetLocationSchema = new mongoose.Schema({
  location: String,
  lat: String,
  long: String,
});

const createTaskSchema = new mongoose.Schema(
  {
    taskName: String,
    taskDescription: String,
    startDate: String,
    endDate: String,
    taskPriority: String,
    taskType: String,
    targetLocation: targetLocationSchema,
    salespersonId: String,
    firstName: String,
    taskStatus: String,
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
    targetLocation: Joi.object({
      location: Joi.string().min(5).max(200).required(),
      lat: Joi.number().required(),
      long: Joi.number().required(),
    }).required(),
    salespersonId: Joi.string().min(0).max(200).required(),
    firstName: Joi.string().min(1).max(200).required(),
    taskStatus: Joi.string().required(),
  });

  return schema.validate(task);
}

mongoose.model("CreateTask", createTaskSchema);
exports.validateTask = validateTask;
