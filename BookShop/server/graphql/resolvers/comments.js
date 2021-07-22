const Event = require("../../models/event");

const checkAuth = require("../../middleware/is-auth");

const DoesNotExist = require("../../middleware/validators");
const ReceivePermission = require("../../middleware/validators");

module.exports = {
  Mutation: {
    createComment: async (_, args, context) => {
      const { username } = checkAuth(context);

      if (args.body.trim() === "") {
        throw new Error("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const event = await Event.findById({ _id: args.id });

      if (!event) {
        throw new DoesNotExist("Event");
      }
      event.comments.unshift({
        body: args.body,
        username,
        createdAt: new Date().toISOString(),
      });
      await event.save();
      return event;
    },
    async deleteComment(_, args, context) {
      checkAuth(context);

      if (typeof (args.id && args.commentId) !== "string") {
        throw new Error("Id isn't valid");
      }

      const event = await Event.findById({ _id: args.id });

      if (event) {
        const commentIndex = event.comments.findIndex(
          (c) => c.id === args.commentId
        );

        if (event.comments[commentIndex].username) {
          event.comments.splice(commentIndex, 1);
          await event.save();
          return event;
        } else {
          throw new ReceivePermission("Delete");
        }
      } else {
        throw new DoesNotExist("Post");
      }
    },
  },
};
