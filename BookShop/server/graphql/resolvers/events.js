const { validateCreateEvent } = require("../../middleware/validators");
const Event = require("../../models/event");

const checkAuth = require("../../middleware/is-auth");

const { UserInputError } = require("apollo-server");
const DoesNotExist = require("../../middleware/validators");
const DoesNotCreate = require("../../middleware/validators");
const ReceivePermission = require("../../middleware/validators");

module.exports = {
  Query: {
    async events() {
      const events = await Event.find();
      return events.map((event) => {
        return event;
      });
    },
    async getEvent(_, { id }) {
      if (typeof id !== "string") throw new Error("Id isn't valid");

      const event = await Event.findById(id);
      if (event) {
        return event;
      } else {
        throw new DoesNotExist("Event");
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
        throw new DoesNotCreate("Event");
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

      const event = await Event.findOneAndUpdate(
        Event.findById(id),
        {
          ...eventInput,
        },
        { new: true }
      );
      if (event) {
        return event;
      } else {
        throw new DoesNotExist("Event");
      }
    },
    async deleteEvent(_, { id }, context) {
      const { username } = checkAuth(context);

      if (username !== "admin") throw new ReceivePermission("Delete");
      const event = await Event.findById(id);
      if (!event) throw new DoesNotExist("Event");
      await event.delete(); // delete from database
      return "Good deleted successfully";
    },
  },
};
