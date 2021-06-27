const { model, Schema } = require("mongoose");

const shoppingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    username: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = model("Shopping", shoppingSchema);
