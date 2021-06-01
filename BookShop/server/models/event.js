const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Event", eventSchema);
