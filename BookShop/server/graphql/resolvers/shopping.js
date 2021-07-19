const Event = require("../../models/event");
const Shopping = require("../../models/shopping");

const checkAuth = require("../../middleware/is-auth");

const { transformShopping } = require("./merge");

const DoesNotExist = require("../../middleware/validators");
const DoesNotCreate = require("../../middleware/validators");

module.exports = {
  Query: {
    async shoppings(_, args, context) {
      const { username } = checkAuth(context);

      const shoppings = await Shopping.find();
      if (shoppings) {
        return shoppings
          .filter((shopping) => shopping.username === username)
          .map((shopping) => {
            return transformShopping(shopping);
          });
      } else {
        throw new DoesNotExist("Shoppings");
      }
    },
  },
  Mutation: {
    async shopEvent(_, args, context) {
      const { username } = checkAuth(context);

      const fetchedEvent = await Event.findById({ _id: args.id });
      if (!fetchedEvent) throw new DoesNotExist("Event");

      const shopping = new Shopping({
        event: fetchedEvent,
        username: username,
      });
      if (!shopping) throw new DoesNotCreate("Shopping");
      const result = await shopping.save();
      return transformShopping(result);
    },
    async cancelShopping(_, args, context) {
      checkAuth(context);
      const shopping = await Shopping.findById(args.shoppingId).populate(
        "event"
      );
      if (!shopping) throw new DoesNotExist("Shopping");
      await shopping.delete();
      return "Comment closed successfully";
    },
  },
};
