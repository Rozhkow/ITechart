const Event = require("../../models/event");
const User = require("../../models/user");

module.exports = {
  Mutation: {
    async createComment(_, { id, body }, req) {
      console.log(req);
      if (body === "") {
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
          createdAt: new Date().toISOString(),
        });
        await event.save();
        return event;
      } else throw new Error("Event not found");
    },
    async deleteComment(_, { id, commentId }) {
      const event = await Event.findById({ _id: id });

      if (event) {
        const commentIndex = event.comments.findIndex(
          (c) => c.id === commentId
        );

        event.comments.splice(commentIndex, 1);
        await event.save();
        return event;
      } else {
        throw new Error("Post not found");
      }
    },
  },
};
