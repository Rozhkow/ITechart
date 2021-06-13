const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require('../../date');

const events = async (ids) => {
  try {
    const events = await Event.find({ id: { $in: ids } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (id) => {
  try {
    const event = await Event.findById(id);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async (id) => {
  try {
    const user = await User.findById(id);
    return {
      ...user._doc,
      id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const transformShopping = (shopping) => {
  return {
    ...shopping._doc,
    id: shopping.id,
    user: user.bind(this, shopping._doc.user),
    event: singleEvent.bind(this, shopping._doc.event),
    createdAt: dateToString(shopping._doc.createdAt),
    updatedAt: dateToString(shopping._doc.updatedAt),
  };
};

exports.transformEvent = transformEvent;
exports.transformShopping = transformShopping;
