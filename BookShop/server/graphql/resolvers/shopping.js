const Event = require("../../models/event");
const User = require("../../models/user");
const Shopping = require("../../models/shopping");
const { dateToString } = require("../../date");
const DataLoader = require("dataloader");

const checkAuth = require("../../middleware/is-auth");

// const eventLoader = new DataLoader((eventIds) => {
//   return events(eventIds);
// });

// const userLoader = new DataLoader((userIds) => {
//   return User.find({ _id: { $in: userIds } });
// });

// const user = async (id) => {
//   try {
//     const user = await userLoader.load(id.toString());
//     return {
//       ...user._doc,
//       _id: user.id,
//       createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
//     };
//   } catch (err) {
//     throw err;
//   }
// };
// const events = async (eventIds) => {
//   try {
//     const events = await Event.find({ _id: { $in: eventIds } });
//     events.sort((a, b) => {
//       return (
//         eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
//       );
//     });
//     return events.map((event) => {
//       return transformEvent(event);
//     });
//   } catch (err) {
//     throw err;
//   }
// };
const singleEvent = async (id) => {
  try {
    const event = await Event.findById(id);
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
    shoppingId: shopping.id,
    // user: user.bind(this, shopping._doc.user),
    event: singleEvent.bind(this, shopping._doc.event),
    createdAt: dateToString(shopping._doc.createdAt),
    // updatedAt: dateToString(shopping._doc.updatedAt),
  };
};
const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
  };
};

module.exports = {
  Query: {
    async shoppings(_, args, req) {
      try {
        const shoppings = await Shopping.find();
        return shoppings.map((shopping) => {
          return transformShopping(shopping);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async shopEvent(_, args, context) {
      const { username } = checkAuth(context);
      const fetchedEvent = await Event.findById({ _id: args.id });
      const shopping = new Shopping({
        event: fetchedEvent,
        username: username,
      });
      
      const result = await shopping.save();
      return transformShopping(result);
    },
    async cancelShopping(_, args) {
      try {
        const shopping = await Shopping.findById(args.shoppingId).populate(
          "event"
        );
        const event = {
          ...shopping.event._doc,
          shoppingId: shopping.event.id,
        };
        await shopping.delete();
        return "Comment closed successfully";
      } catch (err) {
        throw err;
      }
    },
  },
};
