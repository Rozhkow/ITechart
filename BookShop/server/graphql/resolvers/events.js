const Event = require("../../models/event");
const User = require("../../models/user");

const { transformEvent } = require("./merge");

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on("finish", () => resolve())
      .on("error", reject)
  );

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
      autor: args.eventInput.autor,
      pageNumber: args.eventInput.pageNumber,
      publishYear: args.eventInput.publishYear,
    });

    if (title.trim() === "") {
      let createdEvent = await event.save(); // save into database
      return createdEvent;
    } else {
      throw new Error("Title must not be empty");
    }
  },
  updateEvent: async (args, req) => {
    try {
      return Event.findOneAndUpdate(
        Event.findById(args.id),

        {
          id: args.id,
          title: args.title,
          description: args.description,
          price: args.price,
          autor: args.autor,
          pageNumber: args.pageNumber,
          publishYear: args.publishYear,
        },
        { new: true }
      );
    } catch (err) {
      throw new Error(err);
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
