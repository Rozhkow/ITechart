const { validateAddOrder } = require("../../middleware/validators");
const Order = require("../../models/order");
const Shopping = require("../../models/shopping");

const checkAuth = require("../../middleware/is-auth");

const { transformOrder } = require('./merge');

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
      const { username } = checkAuth(context);
      var fetchedShoppings = [];
      for (let i = 0; i < args.shoppingIds.length; i++) {
        fetchedShoppings.push(
          await Shopping.findById({
            _id: args.shoppingIds[i],
          })
        );
      }

      const { valid, errors } = validateAddOrder(
        args.name,
        args.lastname,
        args.address
      );

      if (!valid) {
        throw new Error({ errors });
      }

      const order = new Order({
        name: args.name,
        lastname: args.lastname,
        address: args.address,
        totalPrice: args.totalPrice,
        shoppings: fetchedShoppings,
        username: username,
      });

      const addingOrder = await order.save();
      
      return transformOrder(addingOrder);
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
