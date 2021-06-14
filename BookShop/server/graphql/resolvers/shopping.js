const Event = require("../../models/event");
const Shopping = require("../../models/shopping");
const { dateToString } = require("../../date");

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
const transformShopping = (shopping) => {
  return {
    ...shopping._doc,
    id: shopping.id,
    event: singleEvent.bind(this, shopping._doc.event),
    createdAt: dateToString(shopping._doc.createdAt),
    // updatedAt: dateToString(shopping._doc.updatedAt),
  };
};

module.exports = {
  shoppings: async () => {
    try {
      const shoppings = await Shopping.find();
      return shoppings.map((shopping) => {
        return transformShopping(shopping);
      });
    } catch (err) {
      throw err;
    }
  },
  shopEvent: async (args) => {
    const fetchedEvent = await Event.findById({ _id: args.id });
    const shopping = new Shopping({
      event: fetchedEvent,
    });
    const result = await shopping.save();
    return transformShopping(result);
  },
  cancelShopping: async (args) => {
    try {
      const shopping = await Shopping.findById(args.id).populate("event");
      const event = {
        ...shopping.event._doc,
        id: shopping.event.id,
      };
      await shopping.delete();
      return event;
    } catch (err) {
      throw err;
    }
  },
};
