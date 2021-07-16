const Event = require("../../models/event");
const Shopping = require("../../models/shopping");
const { dateToString } = require("../../date");

const transformOrder = (order) => {
  return {
    ...order._doc,
    orderId: order.id,
    shoppings: allShoppings.bind(this, order._doc.shoppings),
    createdAt: dateToString(order._doc.createdAt),
  };
};

const allShoppings = async (_) => {
  try {
    const shoppings = await Shopping.find();
    return shoppings.map((shopping) => {
      return transformShopping(shopping);
    });
  } catch (err) {
    throw err;
  }
};

const transformShopping = (shopping) => {
  return {
    ...shopping._doc,
    shoppingId: shopping.id,
    event: singleEvent.bind(this, shopping._doc.event),
    createdAt: dateToString(shopping._doc.createdAt),
  };
};

const singleEvent = async (id) => {
  try {
    const event = await Event.findById(id);
    return {
      ...event._doc,
      id: event.id,
    };
  } catch (err) {
    throw err;
  }
};

exports.transformOrder = transformOrder;
exports.transformShopping = transformShopping;
