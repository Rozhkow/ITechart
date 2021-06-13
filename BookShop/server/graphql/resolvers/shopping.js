const Event = require("../../models/event");
const Shopping = require("../../models/shopping");
const { dateToString } = require('../../date');



const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
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
    // createdAt: dateToString(shopping._doc.createdAt),
    // updatedAt: dateToString(shopping._doc.updatedAt),
  };
};
const transformEvent = event => {
  return {
    ...event._doc,
    id: event.id,
    // date: dateToString(event._doc.date)
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
    const fetchedEvent = await Event.findOne({ id: args.eventId });
    const shopping = new Shopping({
      event: fetchedEvent,
    });
    const result = await shopping.save();
    return transformShopping(result);
  },
  cancelShopping: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }
    try {
      const shopping = await Shopping.findById(args.shoppingId).populate(
        "event"
      );
      const event = transformEvent(shopping.event);
      await Shopping.deleteOne({ id: args.shoppingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};

