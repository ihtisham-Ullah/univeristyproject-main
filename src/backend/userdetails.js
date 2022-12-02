const mongoose = require("mongoose");
const userDetailSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    phoneNo: String,
  },
  {
    collection: "Userinfo",
  }
);

mongoose.model("Userinfo", userDetailSchema);
