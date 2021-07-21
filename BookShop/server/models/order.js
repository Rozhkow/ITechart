const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    deliveryMethod: {
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
