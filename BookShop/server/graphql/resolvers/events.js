const { validateCreateEvent } = require("../../middleware/validators");
const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
  Query: {
    async events() {
      try {
        const events = await Event.find();
        return events.map((event) => {
          return event;
        });
      } catch (err) {
        throw err;
      }
    },
    async getEvent(_, { id }) {
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
  },
  Mutation: {
    async createEvent(_, args, req) {
      const { errors } = validateCreateEvent(
        args.eventInput.title,
        args.eventInput.description,
        args.eventInput.price,
        args.eventInput.autor,
        args.eventInput.pageNumber,
        args.eventInput.publishYear
      );
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        autor: args.eventInput.autor,
        pageNumber: args.eventInput.pageNumber,
        publishYear: args.eventInput.publishYear,
      });

      let createdEvent = await event.save(); // save into database
      return createdEvent;
    },
    async updateEvent(_, args, req) {
      const { errors } = validateCreateEvent(
        args.title,
        args.description,
        args.price,
        args.autor,
        args.pageNumber,
        args.publishYear
      );

      return Event.findOneAndUpdate(
        Event.findById(args.id),

        {
          title: args.title,
          description: args.description,
          price: args.price,
          autor: args.autor,
          pageNumber: args.pageNumber,
          publishYear: args.publishYear,
        },
        { new: true }
      );
    },
    async deleteEvent(_, { id }) {
      try {
        const event = await Event.findById(id);
        await event.delete(); // delete from database
        return "Good deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
