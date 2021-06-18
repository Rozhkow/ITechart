const Event = require("../../models/event");

module.exports = {
  createComment: async (_, { id, body }) => {
    if (body === "") {
      throw new Error("Empty comment", {
        errors: {
          body: "Comment body must not empty",
        },
      });
    }

    const event = await Event.findById(id);
    if (event) {
      event.comments.unshift({
        createdAt: new Date().toISOString(),
      });
      await event.save();
      return event;
    } else throw new Error("Event not found");
  },
  deleteComment: async (_, { id, commentId }) => {
    const event = await Event.findById(id);

    if (event) {
      const commentIndex = event.comments.findIndex((c) => c.id === commentId);

      if (event.comments[commentIndex].username === username) {
        event.comments.splice(commentIndex, 1);
        await event.save();
        return event;
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    } else {
      throw new UserInputError("Post not found");
    }
  },
};
