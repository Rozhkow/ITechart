const { validateAddOrder } = require("../../middleware/validators");
const Order = require("../../models/order");
const Shopping = require("../../models/shopping");

const checkAuth = require("../../middleware/is-auth");

const { transformOrder } = require("./merge");

const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async orders(_) {
      try {
        const orders = await Order.find();
        return orders.map((order) => {
          return transformOrder(order);
        });
      } catch (err) {
        throw err;
      }
    },
    async getOrder(_, { orderId }, context) {
      try {
        checkAuth(context);
        const order = await Order.findById(orderId);
        if (order) {
          return transformOrder(order);
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addingOrder(_, args, context) {
      try {
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

        const addingOrder = await order.save();

        return transformOrder(addingOrder);
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteOrder(_, { orderId }, context) {
      try {
        checkAuth(context);
        const order = await Order.findById(orderId).populate("shopping");
        await order.delete();
        return "Order deleted successfully";
      } catch (err) {
        throw err;
      }
    },
  },
};
