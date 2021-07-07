const { validateAddOrder } = require("../../middleware/validators");
const Order = require("../../models/order");
const Shopping = require("../../models/shopping");
const Event = require("../../models/event");
const { dateToString } = require("../../date");
const shopping = require("../../models/shopping");

const checkAuth = require("../../middleware/is-auth");

const transformOrder = (order) => {
  return {
    ...order._doc,
    orderId: order.id,
    shoppings: allShoppings.bind(this, order._doc.shoppings),
    createdAt: dateToString(order._doc.createdAt),
  };
};

const allShoppings = async (_, args, req) => {
    try {
      const shoppings = await Shopping.find();
      return shoppings.map((shopping) => {
        return transformShopping(shopping);
      });
    } catch (err) {
      throw err;
    }
  },
  transformShopping = (shopping) => {
    return {
      ...shopping._doc,
      shoppingId: shopping.id,
      // user: user.bind(this, shopping._doc.user),
      event: singleEvent.bind(this, shopping._doc.event),
      createdAt: dateToString(shopping._doc.createdAt),
      // updatedAt: dateToString(shopping._doc.updatedAt),
    };
  };

const singleShopping = async (shoppingId) => {
  try {
    const shopping = await Shopping.findById(shoppingId);
    return {
      ...shopping._doc,
      _id: shopping.shoppingId,
      event: singleEvent.bind(this, shopping._doc.event),
      // date: dateToString(event._doc.date)
    };
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (id) => {
  try {
    const event = await Event.findById(id);
    return {
      ...event._doc,
      id: event.id,
      // date: dateToString(event._doc.date)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    async orders(_, args, req) {
      try {
        const orders = await Order.find();
        return orders.map((order) => {
          return transformOrder(order);
        });
      } catch (err) {
        throw err;
      }
    },
    async getOrder(_, { orderId }) {
      try {
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

      const { errors } = validateAddOrder(
        args.name,
        args.lastname,
        args.address
      );

      const order = new Order({
        name: args.name,
        lastname: args.lastname,
        address: args.address,
        totalPrice: args.totalPrice,
        shoppings: fetchedShoppings,
        username: username,
      });

      const addingOrder = await order.save();
      console.log(addingOrder);
      return transformOrder(addingOrder);
    },
    async deleteOrder(_, { orderId }) {
      try {
        const order = await Order.findById(orderId).populate("shopping");
        await order.delete();
        return "Order deleted successfully";
      } catch (err) {
        throw err;
      }
    },
  },
};
