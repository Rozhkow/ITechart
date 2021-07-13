const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  autor: {
    type: String,
  },
  pageNumber: {
    type: Number,
  },
  publishYear: {
    type: Number,
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  commentCount: {
    type: Number,
  },
  message: {
    type: String,
  },
});

module.exports = model("Event", eventSchema);
