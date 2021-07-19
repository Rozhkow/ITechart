const { validateAddOrder } = require("../../middleware/validators");
const Order = require("../../models/order");
const Shopping = require("../../models/shopping");

const checkAuth = require("../../middleware/is-auth");

const { transformOrder } = require("./merge");

const { UserInputError } = require("apollo-server");
const DoesNotExist = require("../../middleware/validators");
const DoesNotCreate = require("../../middleware/validators");

module.exports = {
  Query: {
    async orders(_) {
      const orders = await Order.find();
      if (orders) {
        return orders.map((order) => {
          return transformOrder(order);
        });
      } else {
        throw new DoesNotExist("Orders");
      }
    },
    async getOrder(_, { orderId }, context) {
      checkAuth(context);
      const order = await Order.findById(orderId);
      if (order) {
        return transformOrder(order);
      } else {
        throw new DoesNotExist("Order");
      }
    },
  },
  Mutation: {
    async addingOrder(_, args, context) {
      const { username } = checkAuth(context);

      const fetchedShoppingsPromises = args.shoppingIds.map(
        async (id) => await Shopping.findById({ _id: id })
      );

      const fetchedShoppings = await Promise.all(fetchedShoppingsPromises);

      const { valid, errors } = validateAddOrder(args);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const shoppingIds = args.shoppingIds;
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

      const order = new Order({
        ...args,
        totalPrice: totalPrice,
        shoppings: fetchedShoppings,
        username: username,
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

      if (!order) throw new DoesNotExist("Order");
      await order.delete();
      return "Order deleted successfully";
    },
  },
};
