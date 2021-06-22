const eventsResolver = require("./events");
const usersResolvers = require("./users");
const shoppingResolver = require("./shopping");
const commentsResolvers = require("./comments");

const rootResolver = {
  ...eventsResolver,
  ...usersResolvers,
  ...shoppingResolver,
  ...commentsResolvers,
  Event: { commentCount: (parent) => parent.comments.length },
};

module.exports = rootResolver;
