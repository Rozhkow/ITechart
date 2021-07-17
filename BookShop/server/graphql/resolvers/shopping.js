const Event = require("../../models/event");
const Shopping = require("../../models/shopping");

const checkAuth = require("../../middleware/is-auth");

const { transformShopping } = require("./merge");

module.exports = {
  Query: {
    async shoppings(_, args, context) {
      try {
        const { username } = checkAuth(context);

        const shoppings = await Shopping.find();

        return shoppings
          .filter((shopping) => shopping.username === username)
          .map((shopping) => {
            return transformShopping(shopping);
          });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async shopEvent(_, args, context) {
      try {
        const { username } = checkAuth(context);

        const fetchedEvent = await Event.findById({ _id: args.id });
        if (fetchedEvent === undefined) throw new Error("Event not found");

        const shopping = new Shopping({
          event: fetchedEvent,
          username: username,
        });

        const result = await shopping.save();
        return transformShopping(result);
      } catch (err) {
        throw err;
      }
    },
    async cancelShopping(_, args, context) {
      try {
        checkAuth(context);
        const shopping = await Shopping.findById(args.shoppingId).populate(
          "event"
        );
        if (shopping === undefined) throw new Error("Shoppin not found");
        await shopping.delete();
        return "Comment closed successfully";
      } catch (err) {
        throw err;
      }
    },
  },
};
