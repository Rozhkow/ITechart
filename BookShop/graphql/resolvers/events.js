const Event = require("../../models/event");
const User = require("../../models/user");

const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return event;
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
    });

    try {
      let createdEvent = await event.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteEvent: async ({ id }) => {
    try {
      const event = await Event.findById(id);
      // if (user.username === "admin") {
      await event.delete();
      return "Good deleted successfully";
      // } else {
      //   throw new Error('Action not allowed');
      // }
    } catch (err) {
      throw new Error(err);
    }
  },
};
