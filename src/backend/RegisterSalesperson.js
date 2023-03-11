const mongoose = require("mongoose");
const Joi = require("joi");
const { required } = require("joi");

const userDetailSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    phoneNo: String,
    photo: String,
    cloudinaryId: String,
  },
  {
    collection: "Userinfo",
  }
);
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    address: Joi.string().min(5).max(50).required(),
    phoneNo: Joi.string().min(5).max(50).required(),
    cloudinaryId: required(),
  });

  return schema.validate(user);
}
mongoose.model("Userinfo", userDetailSchema);
exports.validateUser = validateUser;
