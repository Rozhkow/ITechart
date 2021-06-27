const Event = require("../../models/event");
const User = require("../../models/user");

const checkAuth = require("../../middleware/is-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { id, body }, context) => {
      const { username } = checkAuth(context);
      console.log(username);
      if (body.trim() === "") {
        throw new Error("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const event = await Event.findById({ _id: id });
      // const user = await User.findById({ user: req.id });
      // console.log(user);
      if (event) {
        event.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await event.save();
        return event;
      } else throw new Error("Event not found");
    },
    async deleteComment(_, { id, commentId }, context) {
      const { username } = checkAuth(context);

      const event = await Event.findById({ _id: id });

      if (event) {
        const commentIndex = event.comments.findIndex(
          (c) => c.id === commentId
        );
        console.log(commentIndex)
        if (event.comments[commentIndex].username) {
          event.comments.splice(commentIndex, 1);
          await event.save();
          return event;
        } else {
          throw new Error("Action not allowed");
        }
      } else { 
        throw new Error("Post not found");
      }
    },
  },
};
