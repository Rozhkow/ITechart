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
  getEvent: async ({ id }) => {
    try {
      const event = await Event.findById(id);
      if (event) {
        return event;
      } else {
        throw new Error("Good not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  createEvent: async (args, req) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
    });

    try {
      let createdEvent = await event.save(); // save into database
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteEvent: async ({ id }) => {
    try {
      const event = await Event.findById(id);
      await event.delete(); // delete from database
      return "Good deleted successfully";
    } catch (err) {
      throw new Error(err);
    }
  },
};
