const Order = require("../../models/order");
const Shopping = require("../../models/shopping");
const Event = require("../../models/event");
const { dateToString } = require("../../date");

const transformOrder = (order) => {
    return {
      ...order._doc,
      orderId: order.id,
      // user: user.bind(this, shopping._doc.user),
      shopping: singleShopping.bind(this, order._doc.shopping),
      // createdAt: dateToString(order._doc.createdAt),
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
        }
    },
    Mutation: {
        async addingOrder(_, args) {
            const fetchedShopping = await Shopping.findById({_id: args.shoppingId});
            
            const order = new Order({
                name: args.name,
                lastname: args.lastname,
                address: args.address,
                shopping: fetchedShopping,
            });
            
            const addingOrder = await order.save();

            return transformOrder(addingOrder);
        },
        async deleteOrder(_, { orderId }) {
            try {
                const order = await Order.findById(orderId).populate(
                  "shopping"
                );
                await order.delete();
                return "Order deleted successfully";
              } catch (err) {
                throw err;
              }
        }
    }
};
  