const { validateCreateEvent } = require("../../middleware/validators");
const Event = require("../../models/event");

const checkAuth = require("../../middleware/is-auth");

const { UserInputError } = require('apollo-server');


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
        if(typeof(id) !== "string") throw new Error("Id isn't valid");

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
    async createEvent(_, args, context) {
        checkAuth(context);

        const { errors, valid } = validateCreateEvent(
        args.eventInput.title,
        args.eventInput.description,
        args.eventInput.price,
        args.eventInput.autor,
        args.eventInput.pageNumber,
        args.eventInput.publishYear
      );

      if(!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        autor: args.eventInput.autor,
        pageNumber: args.eventInput.pageNumber,
        publishYear: args.eventInput.publishYear,
      });

      if(!event) {
        errors.general = "Event not created"
      }

      let createdEvent = await event.save(); // save into database
     
      return createdEvent;
      
      
    },
    async updateEvent(_, args, context) {
        checkAuth(context);

        const { errors, valid } = validateCreateEvent(
          args.title,
          args.description,
          args.price,
          args.autor,
          args.pageNumber,
          args.publishYear
        );

        if(!valid) {
          throw new UserInputError('Errors', { errors });
        }

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
    async deleteEvent(_, { id }, context) {
      try {
        const { username } = checkAuth(context);

        if(username !== "admin") throw new Error("You don't have a permission")
        const event = await Event.findById(id);
        await event.delete(); // delete from database
        return "Good deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
