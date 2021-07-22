const { validateAddOrder } = require("../../middleware/validators");
const Order = require("../../models/order");
const Shopping = require("../../models/shopping");
const User = require("../../models/user");

const checkAuth = require("../../middleware/is-auth");

const { transformOrder } = require("./merge");

const { UserInputError } = require("apollo-server");
const DoesNotExist = require("../../middleware/validators");
const DoesNotCreate = require("../../middleware/validators");

module.exports = {
  Query: {
    async orders() {
      const orders = await Order.find();
      if (!orders) {
        throw new DoesNotExist("Orders");
      }
      return orders.map((order) => {
        return transformOrder(order);
      });
    },
    async getOrder(_, { orderId }, context) {
      checkAuth(context);

      const order = await Order.findById(orderId);
      if (!order) {
        throw new DoesNotExist("Order");
      }
      return transformOrder(order);
    },
  },
  Mutation: {
    async addingOrder(_, orderData, context) {
      const { username } = checkAuth(context);

      const fetchedShoppingsPromises = orderData.shoppingIds.map(
        async (id) => await Shopping.findById({ _id: id })
      );

      const fetchedShoppings = await Promise.all(fetchedShoppingsPromises);

      const { valid, errors } = validateAddOrder(orderData);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const shoppingIds = orderData.shoppingIds;
      const shoppings = await Shopping.find({
        _id: {
          $in: shoppingIds,
        },
      }).populate("event");

      const totalPrice = shoppings.reduce(
        (priceAccumulator, shopping) =>
          (priceAccumulator += shopping.event.price),
        0
      );

      const user = await User.findOne({ username });

      if (!user) {
        throw new DoesNotExist("User");
      }

      const order = new Order({
        ...orderData,
        totalPrice: totalPrice,
        shoppings: fetchedShoppings,
        username: username,
        user: user,
      });

      if (!order) {
        throw new DoesNotCreate("Order");
      }

      const addingOrder = await order.save();
      return transformOrder(addingOrder);
    },
    async deleteOrder(_, { orderId }, context) {
      checkAuth(context);

      const order = await Order.findById(orderId).populate("shopping");

      if (!order) {
        throw new DoesNotExist("Order");
      }
      await order.delete();
      return "Order deleted successfully";
    },
  },
};
