const mongoose = require("mongoose");
const adminDataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    collection: "Admininfo",
  }
);

mongoose.model("Admininfo", adminDataSchema);
