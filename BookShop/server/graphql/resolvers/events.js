const { validateCreateEvent } = require("../../middleware/validators");
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

    if (args.eventInput.title.trim() === "") {
      errors.title = "Title must not be empty";
      throw new Error("Title must not be empty", { errors });
    } else if (args.eventInput.description.trim() === "") {
      errors.description = "Description must not be empty";
      throw new Error("Description must not be empty", { errors });
    } else if (args.eventInput.price.trim() === "") {
      errors.price = "Price must not be empty";
      throw new Error("Price must not be empty", { errors });
    } else if (args.eventInput.autor.trim() === "") {
      errors.autor = "Autor must not be empty";
      throw new Error("Autor must not be empty", { errors });
    } else if (args.eventInput.pageNumber.trim() === "") {
      errors.pageNumber = "PageNumber must not be empty";
      throw new Error("PageNumber must not be empty", { errors });
    } else if (args.eventInput.publishYear.trim() === "") {
      errors.publishYear = "PublishYear must not be empty";
      throw new Error("PublishYear must not be empty", { errors });
    }

    let createdEvent = await event.save(); // save into database
    return createdEvent;
  },
  updateEvent: async (args, req) => {
    const { errors } = validateCreateEvent(
      args.id,
      args.title,
      args.description,
      args.price,
      args.autor,
      args.pageNumber,
      args.publishYear
    );

    if (args.id.trim() === "") {
      errors.id = "ID must not be empty";
      throw new Error("ID must not be empty", { errors });
    } else if (args.title.trim() === "") {
      errors.title = "Title must not be empty";
      throw new Error("Title must not be empty", { errors });
    } else if (args.description.trim() === "") {
      errors.description = "Description must not be empty";
      throw new Error("Description must not be empty", { errors });
    } else if (args.price.trim() === "") {
      errors.price = "Price must not be empty";
      throw new Error("Price must not be empty", { errors });
    } else if (args.autor.trim() === "") {
      errors.autor = "Autor must not be empty";
      throw new Error("Autor must not be empty", { errors });
    } else if (args.pageNumber.trim() === "") {
      errors.pageNumber = "PageNumber must not be empty";
      throw new Error("PageNumber must not be empty", { errors });
    } else if (args.publishYear.trim() === "") {
      errors.publishYear = "PublishYear must not be empty";
      throw new Error("PublishYear must not be empty", { errors });
    }

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
  },

  //   try {
  //     return Event.findOneAndUpdate(
  //       Event.findById(args.id),

  //       {
  //         id: args.id,
  //         title: args.title,
  //         description: args.description,
  //         price: args.price,
  //         autor: args.autor,
  //         pageNumber: args.pageNumber,
  //         publishYear: args.publishYear,
  //       },
  //       { new: true }
  //     );
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // },
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
