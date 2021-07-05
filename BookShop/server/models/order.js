const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
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
  shopping: {
    type: Schema.Types.ObjectId,
    ref: "Shopping",
  },
  totalPrice: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

module.exports = model("Order", orderSchema);