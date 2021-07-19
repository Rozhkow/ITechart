const { validateCreateEvent } = require("../../middleware/validators");
const Event = require("../../models/event");

const checkAuth = require("../../middleware/is-auth");

const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async events() {
      try {
        const events = await Event.find();
        return events.map((event) => {
          return event;
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getEvent(_, { id }) {
      try {
        if (typeof id !== "string") throw new Error("Id isn't valid");

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
  },
  Mutation: {
    async createEvent(_, { eventInput }, context) {
      checkAuth(context);

      const { errors, valid } = validateCreateEvent(eventInput);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const event = new Event(eventInput);

      if (!event) {
        errors.general = "Event not created";
      }

      let createdEvent = await event.save(); // save into database

      return createdEvent;
    },
    async updateEvent(_, { id, eventInput }, context) {
      checkAuth(context);

      const { errors, valid } = validateCreateEvent(eventInput);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      return Event.findOneAndUpdate(
        Event.findById(id),
        {
          ...eventInput,
        },
        { new: true }
      );
    },
    async deleteEvent(_, { id }, context) {
      try {
        const { username } = checkAuth(context);

        if (username !== "admin")
          throw new Error("You don't have a permission");
        const event = await Event.findById(id);
        await event.delete(); // delete from database
        return "Good deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
