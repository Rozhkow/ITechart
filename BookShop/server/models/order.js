const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    address: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    shoppings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Shopping",
      },
    ],
    totalPrice: {
      type: Number,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
