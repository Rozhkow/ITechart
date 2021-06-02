const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true, // boolean or function, if true adds a required validator for this property
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);