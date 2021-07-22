const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
  },
});

module.exports = model("User", userSchema);
