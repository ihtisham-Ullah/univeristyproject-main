const mongoose = require("mongoose");
const Joi = require("joi");
const adminDataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    collection: "Admininfo",
  }
);
function validateAdmin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(25).required().email(),
    password: Joi.string().min(1).max(255).required(),
  });

  return schema.validate(user);
}
mongoose.model("Admininfo", adminDataSchema);
exports.validateAdmin = validateAdmin;
